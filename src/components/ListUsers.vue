<template>
  <div class="list row">
    <div class="col-md-6">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by FirstName"
          v-model="firstName"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchByFirstName">Search</button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Email"
          v-model="email"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchByEmail">Search</button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          {{ user.firstName }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>User</h4>
         <div>
          <label><strong>Code:</strong></label> {{ currentUser.code }}
        </div>
        <div>
          <label><strong>First Name:</strong></label> {{ currentUser.firstName }}
        </div>
        <div>
          <label><strong>Last Name:</strong></label> {{ currentUser.lastName }}
        </div>
         <div>
          <label><strong>E-mail:</strong></label> {{ currentUser.email }}
        </div>
         <div>
          <label><strong>Create Date:</strong></label> {{ currentUser.createDate }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentUser.published ? "Published" : "Pending" }}
        </div>

        <a class="btn btn-warning" :href="'/users/' + currentUser.code">Edit</a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      firstName: "",
      email:""
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
        .then(response => {
          this.users = response.data.content;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    
    searchByFirstName() {
      UserDataService.findByFirstName(this.firstName)
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchByEmail() {
      UserDataService.findByEmail(this.email)
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>