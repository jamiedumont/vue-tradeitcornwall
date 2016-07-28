<template>
  <div id="{{id}}" class="gritcode-file-upload {{advancedUpload ? 'advanced-upload' : ''}} {{dragover ? 'is-dragover' : ''}}">
    <div class="input" v-if="state == null || state == 'retry'">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43" v-if="advancedUpload">
            <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z" />
        </svg>
        <input
            type="file"
            name="files[]"
            id="file"
            accept="accept"
            v-bind:multiple="multiple && advancedUpload"
            v-on:change="onChange($event)" />
        <label for="file">
            <span v-if="fileList.length == 0"><strong>{{text.action}}</strong><span v-if="advancedUpload"> {{text.drag}}</span></span>
            <!-- <span><strong>{{text.action}}</strong><span v-if="advancedUpload"> {{text.drag}}</span></span> -->
            <span v-if="fileList.length > 0" class="">{{displaySelectionText}}</span>
        </label>
        <button type="submit" class="btn btn-primary" v-if="!hideButton && !autoSubmit" v-on:click.prevent="submitForm($event)">{{text.button}}</button>
    </div>
    <div class="state" v-if="state != null">
        <span class="state-uploading animate" v-show="state == 'uploading'">{{text.uploading}}<span v-if="advancedUpload">{{progress}}</span></span>
        <span class="state-success animate" v-show="state == 'success'">
            {{text.done}} <a href="#" v-on:click.prevent="restart" role="button" v-show="multiple">{{text.restart}}</a>
        </span>
        <span class="state-error animate" v-show="state == 'error'">
            Error! <span>{{errorMessage}}</span> <a href="#" v-on:click.prevent="retry">{{text.retry}}</a>
        </span>
    </div>
</div>

</template>

<script>
  import trigger from 'src/utils/trigger'

  export default {
    // Options / Data
    name: 'FileUpload',
    data () {
      return {
        state: null,
        dragover: false,
        progress: '0%',
        errorMessage: ''
      }
    },
    props: {
      accept: {
        type: String,
        default: ''
      },
      ajax: {
        type: String,
        default: ''
      },
      autoSubmit: {
        type: Boolean,
        default: false
      },
      id: {
        type: String,
        default: ''
      },
      formId: {
        type: String,
        default: ''
      },
      method: {
        type: String,
        default: 'POST'
      },
      name: {
        type: String,
        default: 'files'
      },
      model: {
        default: null
      },
      multiple: {
        type: Boolean,
        default: false
      },
      fileList: {
        default: null
      },
      hideButton: {
        type: Boolean,
        default: false
      },
      text: {
        type: Object,
        default () {
          return {
            action: 'Choose a file',
            drag: 'or drag it here.',
            selected: 'files selected',
            button: 'Upload',
            uploading: 'Uploading...',
            done: 'Done!',
            restart: 'Upload more?',
            retry: 'Try again!'
          }
        }
      }
    },
    computed: {
      advancedUpload () {
        const div = document.createElement('div')
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
      },
      displaySelectionText () {
        if (!this.fileList.length) return ''
        let result = this.fileList.length > 1 ? `${this.fileList.length} ${this.text.selected}` : this.fileList[0].name
        if (this.state === 'retry') {
          result += ' (change)'
        }
        return result
      }
    },
    methods: {
      submitForm () {
        if (!this.fileList.length) return
      },
      retry () {
        this.state = 'retry'
        trigger(this._input, 'change')
      },
      restart () {
        this.state = null
        this.fileList = []
      },
      onChange (e) {
        if (this.state === 'retry') {
          this.state = null
        }
        if (this.advancedUpload) {
          this.fileList = e.target.files
          if (this.autoSubmit) {
            this.submitForm()
          }
        } else {
          this.fileList.push({name: this._input.value.replace(/^.*\\/, '')})
        }
      },
      _eventHandler (e) {
        // stop propagation to avoid accidental behaviour
        e.preventDefault()
        e.stopPropagation()

        // handle dragover
        if (e.type === 'dragover' || e.type === 'dragenter') {
          this.dragover = true
        }

        // handle dragleave
        if (e.type === 'dragend' || e.type === 'dragleave' || e.type === 'drop') {
          this.dragover = false
          if (e.type === 'drop') {
            this.fileList = e.dataTransfer.files // the files that were dropped
            if (this.autoSubmit) {
              this.submitForm()
            }
          }
        }
      }
    }, // ,
    // watch: {},
    // Options / DOM
    // el () {},
    // replace: true,
    // template: '',
    // Options / Lifecycle Hooks
    // init () {},
    // crated () {},
    // beforeCompile () {},
    // compiled () {},
    ready () {
      this._input = this.$el.querySelector('input')
      if (this.advancedUpload) {
        let events = ['drag', 'dragstart', 'dragend', 'dragleave', 'drop', 'dragover', 'dragenter']
        events.forEach((event) => {
          this.$el.addEventListener(event, (e) => this._eventHandler(e))
        })

        // drag start
        events = ['dragover', 'dragenter']
        events.forEach((event) => (e) => this._eventHandler(e))

        // drag end
        events = ['dragend', 'dragleave', 'drop']
        events.forEach((event) => {
          this.$el.addEventListener(event, (e) => this._eventHandler(e))
        })
      } else {
        // get a wrapping form element id paseed in options
        if (!this.formId) {
          // throw "You need to wrap this component in a form and specify it's id in a 'form-id' attribute."
        }
        this._wrappingForm = document.getElementById(this.formId)
      }
    },
    beforeDestroy () {
      const events = ['drag', 'dragstart', 'dragend', 'dragleave', 'drop', 'dragover', 'dragenter']
      events.forEach((event) => {
        this.$el.removeEventListener(event, () => this._eventHandler())
      })
    },
    // attached () {},
    // detached () {},
    // destroyed () {},
    // Options / Assets
    // directives: {},
    // elementDirectives: {},
    // filters: {},
    // components: {},
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    events: {
      'submit::file-upload' (id) {
        if (this.id === id) {
          this.submitForm()
        }
      }
    }
    // mixins: [],
    // name: ''
  }
</script>

<style lang="scss" scoped>
  // variables
$gritcode-file-upload-background: #c8dadf;
$gritcode-file-upload-background-dragover: #fff;
$gritcode-file-upload-background-dragover-outline:#c8dadf;
$gritcode-file-upload-button-color: #e5edf1;
$gritcode-file-upload-button-background: #39bfd3;
$gritcode-file-upload-button-border: none;
$gritcode-file-upload-icon-color: #92b0b3;
$gritcode-file-upload-label-color: #39bfd3;

// animation
@keyframes appear-from-inside
{
    from    { transform: scale( 0 ); }
    75%     { transform: scale( 1.1 ); }
    to      { transform: scale( 1 ); }
}

// core
.gritcode-file-upload {
    text-align: center;
    font-size: 1.25rem; /* 20 */
    background-color: $gritcode-file-upload-background;
    position: relative;
    padding: 100px 20px;
    &.advanced-upload {
        outline: 2px dashed #92b0b3;
        outline-offset: -10px;
        transition: outline-offset .15s ease-in-out, background-color .15s linear;
    }

    .input {
        .icon {
            width: 100%;
            height: 80px;
            fill: $gritcode-file-upload-icon-color;
            display: block;
            margin-bottom: 40px;
        }
        .btn-primary {
            font-weight: 700;
            color: $gritcode-file-upload-button-color;
            background-color: $gritcode-file-upload-button-background;
            border: $gritcode-file-upload-button-border;
            display: block;
            padding: 8px 16px;
            margin: 40px auto 0;
        }
    }

    .state {
        .state-uploading {
            font-style: italic;
        }
    }

    .animate  {
        animation: appear-from-inside .25s ease-in-out;
    }

    &.is-dragover {
        outline-offset: -20px;
        outline-color: $gritcode-file-upload-background-dragover-outline;
        background-color: $gritcode-file-upload-background-dragover;
    }

    input[type="file"] {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        + label {
            margin-bottom: 0;
            max-width: 80%;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            display: inline-block;
            overflow: hidden;
            &:hover, &:focus {
                color: $gritcode-file-upload-label-color;
            }
        }
        &:focus + label, &.has-focus + label {
            outline: 1px dotted #000;
            outline: -webkit-focus-ring-color auto 5px;
        }
    }
}
</style>
