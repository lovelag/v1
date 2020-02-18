<template>
  <div class="hello">
   <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
     <div class="container">
        <router-link class="navbar-brand" to="/">Vue Shop</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link" href="#">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" href="#">About</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <a class="btn btn-outline-success my-2 my-sm-0" @click="showModal">Get Start</a>
            <a class="btn btn-outline-info border-0 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
              <i class="fas fa-cart-plus"></i>
            </a>
          </form>
        </div>
     </div>
</nav>
<div>
    <b-modal ref="my-modal" hide-footer>
      <div class="d-block text-center">
        </div>
        <div>
        <b-tabs content-class="mt-3" justified>
          <b-tab title="Sign Up" active>
            <p>Sign up</p>
             <div>
    <b-form v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
          </b-tab>
          <b-tab title="Login">
            <p>Login</p>
           </b-tab>
        </b-tabs>
       </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>
  </div>
  </div>
</template>

<script>
import { fb, db } from '../firebase'
import $ from 'jquery'

export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  components: {},
  data () {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    login () {
      fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $('#login').modal('hide')
          this.$router.replace('admin')
        })
        .catch(function (error) {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
    },
    register () {
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          $('#login').modal('hide')
          db.collection('profiles').doc(user.user.uid).set({
            name: this.name
          })
            .then(function () {
              console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })
          this.$router.replace('admin')
        })
        .catch(function (error) {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @media (min-width: 992px) {
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }
   }
.btn-modal {
  margin: 2em;
}
.btn {
  border-radius: 0;
  border: none;
  -webkit-transition: background-color ease-out 0.5s;
  -moz-transition: background-color ease-out 0.5s;
  -o-transition: background-color ease-out 0.5s;
  transition: background-color ease-out 0.5s;
  &:hover {
    -webkit-transition: box-shadow ease-out 0.3s;
    -moz-transition: box-shadow ease-out 0.3s;
    -o-transition: box-shadow ease-out 0.3s;
    transition: box-shadow ease-out 0.3s;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
}
.btn-grey {
  background: #797979;
  color: #fff;
  &:hover {
    background: #575757;
    color: #fff;
  }
}
.close {
  opacity: 0.4;
  position: absolute;
  right: 10px;
  top: 5px;
  z-index: 1;
}
.form-control {
  border-radius: 0;
  box-shadow: none;
  &:focus {
    box-shadow: none;
    border-color: #999;
  }
}
#myModal {
  .modal-content {
    border-radius: 0;
    border: none;
    form {
      label {
        font-weight: normal;
        margin-bottom: 2px;
      }
    }
  }
  .modal-footer {
    text-align: left;
  }
}
.nav-tabs {
  &>li {
    width: 50%;
    a {
      margin: 0;
      border-radius: 0;
      text-align: center;
      font-weight: 600;
    }
  }
}
.nav-tabs>li>a {
  background-color: #ccc;
  color: #666;
}
.nav-tabs>li.active>a,
.nav-tabs>li.active>a:focus {
  background-color: #f7f7f7;
  color: #5a5a5a;
}
.modal-content {
  background-color: #f7f7f7;
}
.parsley-error {
  border-color: #c00;
  color: #c00;
  background-color: #FFD9D9;
}
#forgot-password-collapse {
  border-top: 2px dashed #999;
  margin-top: 30px;
  h5 {
    margin-top: 15px;
  }
  form {
    margin-top: 20px;
  }
}
.existing-customer {
  display: none;
}

</style>
