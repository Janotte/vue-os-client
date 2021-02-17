<template>
  <div class="submit-form">
    <div v-if="!submitted">

    <div class="form-group">
        <label for="code">Code</label>
        <input
          type="text"
          class="form-control"
          id="code"
          required
          v-model="user.code"
          name="code"
        />
      </div>

      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          required
          v-model="user.firstName"
          name="firstName"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          class="form-control"
          id="lastName"
          required
          v-model="user.lastName"
          name="lastName"
        />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import ErrorService from "../services/ErrorService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        code: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        code: this.user.code,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      };

      UserDataService.create(data)
        .then(response => {
          this.user.code = response.data.code;
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
          ErrorService.onError(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.user = {};
    },

    methodThrowsException() {
      try {
        // Do unexpected job
      } catch (error) {
        ErrorService.onError(error);
      }
    }

  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>