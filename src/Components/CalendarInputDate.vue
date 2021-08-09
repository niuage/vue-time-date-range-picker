<template>
  <div class="vdpr-datepicker__calendar-input-date">
    <input
      class="vdpr-datepicker__calendar-input-date-elem"
      type="text"
      name="date-input"
      :class="inputClass"
      :value="formattedValue"
      @change="onChange"
    />
  </div>
</template>

<script setup>
  import { computed, toRefs, ref, watch } from 'vue';
  import DateUtil from '../Utils/DateUtil';

  const props = defineProps({
    inputClass: [String, Object, Array],
    timestamp: Number,
    format: String,
    language: String,
  });

  const emit = defineEmit(['on-change']);

  const { timestamp } = toRefs(props);

  const dateUtil = computed(() => {
    return new DateUtil(props.language);
  });

  const formattedValue = computed(() => {
    if (timestamp.value === 0) return '';

    const date = dateUtil.value.fromUnix(timestamp.value);

    return dateUtil.value.formatUTCDate(date, props.format);
  });


  const onChange = (e) => {
    const previousDate = dateUtil.value.fromUnix(timestamp.value);
    const previousTime = dateUtil.value.formatUTCDate(previousDate, 'HH:mm:ss');
    const date = new Date(`${e.target.value} ${previousTime} UTC`)

    if (!dateUtil.value.isValidDate(date)) {
      return false;
    }

    return emit('on-change', date);
  };
</script>
