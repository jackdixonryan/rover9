<template>
  <div class="shade-box">
    <h3 class="header-3">Modifications</h3>
    <div id="mods">
      <div class="mod" v-for="mod in dummyMods" :key="mod.name">
        <h4 class="header-4">{{ mod.name }} <span class="subtitle" style="float: right;">${{mod.price}}</span></h4>
        <p>{{ mod.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dummyMods: [
        {
          name: 'Reflective Paneling',
          description: "Eliminates problems caused by excessive UV damage.",
          price: 100,
        },
        {
          name: 'Retrothrusters',
          description: 'Softens landings when the probe needs to come in too steep.',
          price: 300,
        },
        {
          name: 'Titanium Body',
          description: "Protects against debris and impact damage.",
          price: 200,
        }
      ]
    }
  }
}
</script>

<style>

</style>
