<script setup lang="ts">
    import { computed, ref, onBeforeMount } from 'vue';
    import { useStore } from 'vuex';
    import UserList from '../components/UserList.vue';
    import UserCityFilter from '../components/UserCityFilter.vue';
  
    const store = useStore()
    let cityId = ref(0);
  
    const items = computed(() => store.getters['userModule/users'])
  
    onBeforeMount(async () => {
        try {
            await store.dispatch('userModule/fetchUsers')
        } catch (e) {
            console.log(e)
        }
    })
  
  </script>

<template>
    <el-row>
        <el-col
            :span="12"
            class="filter-column"
        >
            <UserCityFilter
                placeholder="Filter by country"
                style="max-width: 300px; margin-bottom: 10px;"
                :options="[ { label: 'All', value: 0 }, {label: 'Russia', value: 1 }, { label: 'USA', value: 2 } ]"
            />
        </el-col>
        <el-col :span="12">
            <UserList
                title="List"
                :data="items"
            />
        </el-col>
    </el-row>
</template>

<style>
    .filter-column {
        display: flex; 
        flex-direction: column; 
        align-items: center;
        justify-content: start
    }
</style>