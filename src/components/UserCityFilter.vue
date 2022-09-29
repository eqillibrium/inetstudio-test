<script setup lang="ts">
    import { ref, onUpdated } from 'vue';
    import { useStore } from 'vuex';

    export interface Option {
        label: string
        value: number
    }

    export interface Data {
        placeholder: string
        options: Option[]
    }

    const store = useStore()
    const props = defineProps<Data>()
    const select = ref('')

    onUpdated(() => {
        store.commit('userModule/setCityFilterState', select.value)
    })
</script>

<template>
        <el-select
            v-model="select"
            :placeholder="props.placeholder"
        >
            <el-option
                v-for="prop in props.options"
                :key="prop.label"
                :label="prop.label"
                :value="prop.value" 
            />
        </el-select>
</template>