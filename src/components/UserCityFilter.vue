<script setup lang="ts">
    import { ref, onUpdated, Ref } from 'vue';
    import { useStore } from 'vuex';

    export interface Option {
        label: string
        value: number
    }

    export interface Data {
        filterName: string
        options: Option[]
    }

    const store = useStore()
    const props = defineProps<Data>()
    const select: Ref<string | number | undefined>  = ref()

    onUpdated((): void => {
        store.commit('filterModule/setCityFilterState', select.value)
        store.dispatch('filterModule/filter')
    })
</script>

<template>
    <p class="filter-name">{{props.filterName}}</p>
    <el-select
        v-model="select"
        class="select"
        :placeholder="props.filterName"
    >
        <el-option
            v-for="prop in props.options"
            :key="prop.label"
            :label="prop.label"
            :value="prop.value" 
        />
    </el-select>
</template>

<style scoped>
    .select{
        max-width: 300px;
        margin-bottom: 10px;
    }
    .filter-name {
        color: dimgrey
    }
</style>