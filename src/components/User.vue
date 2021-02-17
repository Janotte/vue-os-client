<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User</h4>
    <form>

      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName"
          v-model="currentUser.firstName"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName"
          v-model="currentUser.lastName"
        />
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="text" class="form-control" id="email"
          v-model="currentUser.email"
        />
      </div>

    </form>

    <button class="btn btn-danger mr-2" @click="deleteUser ">Delete</button>

    <button type="submit" class="btn btn-success" @click="updateUser">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import ErrorService from "../services/ErrorService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(code) {
      UserDataService.get(code)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.currentUser.code, this.currentUser)
        .then(response => {
          console.log(response.data.content);
          this.message = 'The user was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.code)
        .then(response => {
          console.log(response.data.content);
          this.$router.push({ name: "users" });
        })
        .catch(e => {
          console.log(e);
        });
    },

    methodThrowsException() {
      try {
        // Do unexpected job
      } catch (error) {
        ErrorService.onError(error);
      }
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.code);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>