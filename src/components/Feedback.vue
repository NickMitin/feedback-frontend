<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Отзывы</h1>
        <hr />
        <br /><br />
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-b-modal.feedback-modal
        >
          Добавить отзыв
        </button>
        <br /><br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Телефон</th>
              <th scope="col">Сообщение</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(feedbackItem, index) in feedback" :key="index">
              <td>{{ feedbackItem.user_name }}</td>
              <td>{{ feedbackItem.phone_number }}</td>
              <td>{{ feedbackItem.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal
      ref="addFeedbackModal"
      id="feedback-modal"
      title="Добавить отзыв"
      hide-footer
    >
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group
          id="form-user_name-group"
          label="Ваше имя"
          label-for="form-user_name-input"
        >
          <b-form-input
            id="form-user_name-input"
            type="text"
            v-model="addFeedbackForm.user_name"
            required
            placeholder=""
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-phone_number-group"
          label="Номер телефона"
          label-for="form-phone_number-input"
        >
          <b-form-input
            id="form-phone_number-input"
            type="text"
            v-model="addFeedbackForm.phone_number"
            v-mask="'+7(###)###-####'"
            required
            placeholder="+7(000)000-0000"
            autocomplete="false"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-message-group"
          label="Сообщение"
          label-for="form-message-input"
        >
          <b-form-textarea
            id="form-message-input"
            v-model="addFeedbackForm.message"
            placeholder=""
            rows="3"
            required
            max-rows="6"
          >
          </b-form-textarea>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Отправить</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      feedback: [],
      addFeedbackForm: {
        user_name: '',
        phone_number: '',
        message: ''
      }
    }
  },
  methods: {
    getFeedback () {
      const path = process.env.BACKEND_BASE_URI + 'feedback'
      axios
        .get(path)
        .then((res) => {
          this.feedback = res.data.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    addFeedback (payload) {
      const path = process.env.BACKEND_BASE_URI + 'feedback'
      axios
        .post(path, payload)
        .then(() => {
          this.getFeedback()
        })
        .catch((error) => {
          console.log(error)
          this.getFeedback()
        })
    },
    initForm () {
      this.addFeedbackForm.user_name = ''
      this.addFeedbackForm.phone_number = ''
      this.addFeedbackForm.message = ''
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$refs.addFeedbackModal.hide()
      const payload = {
        user_name: this.addFeedbackForm.user_name,
        phone_number: this.addFeedbackForm.phone_number,
        message: this.addFeedbackForm.message
      }
      this.addFeedback(payload)
      this.initForm()
    },
    onReset (evt) {
      evt.preventDefault()
      this.$refs.addFeedbackModal.hide()
      this.initForm()
    }
  },
  created () {
    this.getFeedback()
  }
}
</script>
