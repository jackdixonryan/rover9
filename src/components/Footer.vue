<template>
  <div id="footer">
    <div class="link-area" v-for="link in links" :key="link.name">
      <router-link :to="link.href" class="footer-link">{{ link.name }}</router-link>
    </div>
  </div>
</template>

<script>
import RouterLink from 'vue-router';

export default {
  data() {
    return {
      links: [
        {
          name: 'Capsules',
          href: '/capsules',
        },
        {
          name: 'Store',
          href: '/store',
        },
        {
          name: 'Missions',
          href: '/missions'
        },
        {
          name: 'Actives',
          href: '/actives'
        },
        {
          name: 'Settings',
          href: '/settings'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #footer {
    width: 100%;
    display: flex;
    font-family: 'Raleway', sans-serif;
    background: #000428;
    background: -webkit-linear-gradient(to left, #004e92, #000428); 
    background: linear-gradient(to left, #004e92, #000428);
    border-top: 1px #E6E6FA solid;
    color: white;
    position: absolute;
    top: 94vh;
  }

  .link-area {
    flex: 1;
    text-align: center;
    padding: 1.5em;
    opacity: .3;
  }

  .footer-link {
    color: white;
    text-decoration: none;
    font-family: "Raleway", sans-serif;
    padding: 1em;
  }

  .link-area:hover {
    opacity: 1;
  }
</style>
