<template>
  <div class="app">
    <div class="left">
      <div class="character">{{ char }}</div>
      <div class="last-character">Last Character: {{ lastCharacter }}</div>
    </div>
    <div class="right">
      <input
        ref="input"
        v-model="answer"
        class="answer"
        type="text"
        placeholder="Enter Pronunciation Here"
        @keyup.enter="checkAnswer"
      />
      <div ref="indicator" class="indication">{{ indication }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { hiragana, katakana, pronunciations } from './characters';

function getRandomIndex() {
  return Math.floor(Math.random() * hiragana.length);
}

function getRandomCharacter(index: number): string {
  const hiraOrKata = Math.random();
  if (hiraOrKata < 0.5) {
    return hiragana[index];
  } else {
    return katakana[index];
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    const char = ref<string>('');
    const lastCharacter = ref<string>('');
    const answer = ref<string>('');
    const indication = ref<string>('');
    const input = ref<HTMLInputElement | null>(null);
    const indicator = ref<HTMLDivElement | null>(null);

    let randomIndex = getRandomIndex();
    let character = getRandomCharacter(randomIndex);

    console.log(randomIndex);

    char.value = character;

    onMounted(() => {
      input.value?.focus();
    });

    function checkAnswer() {
      const temp = answer.value.toLowerCase();
      if (indicator.value) {
        indicator.value.className = 'indication';
      }

      let correct = false;
      const candidates = pronunciations[randomIndex].split('/');

      for (const candidate of candidates) {
        if (candidate === temp) {
          correct = true;
          break;
        }
      }

      if (correct) {
        indication.value = 'Correct!';
        indicator.value?.classList.add('correct');
      } else {
        indication.value = `Wrong! The correct answer should be "${pronunciations[randomIndex]}"`;
        indicator.value?.classList.add('wrong');
      }

      input.value?.select();
      lastCharacter.value = char.value;
      randomIndex = getRandomIndex();
      char.value = getRandomCharacter(randomIndex);
    }

    return {
      lastCharacter,
      char,
      answer,
      indication,
      input,
      indicator,
      checkAnswer,
    };
  },
});
</script>

<style lang="scss" scoped>
$eggwhite: #fff5c4;
$green: rgb(73, 230, 73);
$red: rgb(231, 23, 23);
$character-width: 300px;
$character-height: 300px;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  @include flex-center();
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
}

.left,
.right {
  @include flex-center();
  width: 50%;
  height: 100%;
  position: relative;
  padding: 75px;
}

.left {
  align-items: flex-end;
  flex-direction: column;
}

.character {
  background: $eggwhite;
  width: $character-width;
  height: $character-height;
  border-radius: 25px;
  @include flex-center();
  font-size: 200px;
}

.last-character {
  position: absolute;
  top: calc(50% + #{$character-height} / 2 + 15px);
  font-size: 30px;
  width: $character-width;
  text-align: center;
}

.right {
  flex-direction: column;
  align-items: flex-start;
}

.answer {
  border: none;
  height: 50px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  outline: none;
  font-size: 20px;
  background: $eggwhite;

  &::-webkit-input-placeholder {
    text-align: center;
    font-size: 14px !important;
    color: #2c3e50;
  }
}

.indication {
  width: 200px;
  text-align: center;
  position: absolute;
  top: calc(50% + 50px);
  font-size: 20px;
  font-weight: bold;
}

.correct {
  color: $green;
}

.wrong {
  color: $red;
}
</style>
