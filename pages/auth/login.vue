<template>
  <div class="main-content">
    <div class="container vh-100 d-flex align-items-center">
      <div class="col">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5 col-xl-4">
            <div>
              <div class="mb-5 text-center">
                <h6 class="h3">Login</h6>
                <p class="text-muted mb-0">Sign in to your account to continue.</p>
              </div>
              <span class="clearfix"></span>
              <form role="form" @submit.prevent='login'>
                <div class="form-group">
                  <label class="form-control-label">Email address</label>
                  <div class="input-group input-group-merge">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><b-icon icon="envelope"></b-icon></span>
                    </div>
                    <input type="email" :class="{
                        'is-invalid': form.errors.email
                    }" class="form-control" v-model="form.email" id="input-email" placeholder="name@example.com">
                  </div> 
                  <b-form-invalid-feedback
                    :state="form.errors.email"
                    v-if="form.errors.email"
                    >
                    {{ form.errors.email[0] }}
                    </b-form-invalid-feedback>
                </div>
                <div class="form-group mb-4">
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <label class="form-control-label">Password</label>
                    </div>
                    <div class="mb-2">
                      <a href="simple-login.html#!" class="small text-muted text-underline--dashed border-primary">Lost password?</a>
                    </div>
                  </div>
                  <div class="input-group input-group-merge">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><b-icon icon="lock"></b-icon></span>
                    </div>
                    <input :type="form.type?'text':'password'" 
                    :class="{
                        'is-invalid': form.errors.password
                    }" class="form-control" v-model="form.password" id="input-password" placeholder="Password">
                    <div class="input-group-append" @click="toggleInputType()">
                      <span class="input-group-text">
                        <b-icon icon="eye"></b-icon>
                      </span>
                    </div>
                  </div>
                  <b-form-invalid-feedback
                    v-if="form.errors.password"
                    :state="form.errors.password"
                    >
                    {{ form.errors.password[0] }}
                    </b-form-invalid-feedback>
                </div>
                <div class="mt-4">
                  <b-overlay
                    :show="form.busy"
                    rounded
                    opacity="0.6"
                    spinner-small
                    spinner-variant="primary"
                    class="d-block"
                >
                    <button
                    :disabled="form.busy"
                    class="btn btn-block btn-primary text-white"
                    type="submit"
                    >
                    Sign In
                    </button>
                </b-overlay>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                email: '',
                password: '',
                device: 'alboukam',
                type: false,
                errors: {},
                busy: false,
            }
        }
    },
    methods: {
        async login() {
            this.form.busy = true;
            this.form.errors = {};

            try {
                await this.$auth.loginWith("local", {
                data: this.form
                });
                this.form.busy = false;
                // Redirect home.
                this.$router.push({ name: "home" });
            } catch (e) {
                this.form.busy = false;
                if (e && e.response && e.response.status && e.response.status == 422) {
                this.form.errors = e.response.data.errors;
                } else {
                /* this.$toast.error(
                    this.$t("Communication error with the Notch server")
                ); */
                }
        }
        },
        toggleInputType()
        {
            this.form.type = !this.form.type
        }
    }
}
</script>

<style>

</style>