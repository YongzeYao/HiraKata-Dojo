<template>
  <div class="contact">
    <a target="_blank" href="https://github.com/YongzeYao/HiraKata-Dojo">
      <font-awesome-icon :icon="['fab', 'github']" size="3x" />
    </a>
    <a target="_blank" href="https://www.linkedin.com/in/yongze-yao-95480b132/">
      <font-awesome-icon :icon="['fab', 'linkedin']" size="3x" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContactButtons',
});
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.contact {
  // styles for icons
  a {
    margin: 0 15px;
    color: $eggwhite;
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    &:hover {
      color: $ink;
    }
  }
}
</style>
