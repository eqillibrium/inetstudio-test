<script setup lang="ts">
    import { computed, ref, onBeforeMount } from 'vue';
    import { useStore } from 'vuex';
    import UserList from '../components/UserList.vue';
    import UserCityFilter from '../components/UserCityFilter.vue';
    import UserScoreFilter from '../components/UserScoreFilter.vue';
  
    const store = useStore()
    let cityId = ref(0);
  
    const users = computed(() => store.getters['userModule/filteredUsers'])
    const cityFilters = computed(()=> store.getters['filterModule/cityfilters'])
    const scoreFilters = computed(()=> store.getters['filterModule/scorefilters'])
  
    onBeforeMount(async () => {
        try {
            await store.dispatch('userModule/fetchUsers')
            await store.dispatch('filterModule/fetchFilters')
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
                filterName="Filter by city"
                :options="cityFilters"
            />
            <UserScoreFilter
                filterName="Filter by score"
                :options="scoreFilters"
            />
        </el-col>
        <el-col :span="12">
            <UserList
                title="List"
                :data="users"
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