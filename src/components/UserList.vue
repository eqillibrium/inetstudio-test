<script setup lang="ts">
    import { ref } from 'vue'
    import UserListItem from './UserListItem.vue'
    export interface Item {
        name: string
        text: string
        cityID: number
        imgUrl: string
        address: string
    }

    export interface Props {
        title: string
        data: Item[]
    }

    const props = defineProps<Props>()
    const ok = false
</script>

<template>
    <el-card class="box-card" loading="true">
        <template #header>
            <div class="card-header">
                <span>{{props.title}}</span>
            </div>
        </template>
        <transition-group name="list" tag="div">
            <UserListItem
                v-for="item in props.data"
                :name="item.name"
                :address="item.address"
                :cityID="item.cityID"
                :text="item.text"
                :imgUrl="item.imgUrl"
                :key="item.name"
                class="list-item"
        />
        </transition-group>
    </el-card>
</template>

<style>
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .text {
      font-size: 14px;
    }
    
    .item {
      margin-bottom: 18px;
    }
    
    .box-card {
      width: 480px;
    }
    .list-enter-from,
    .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
    }

    .list-leave-active {
    position: absolute;
    }
    .list-item {
        transition: all 0.8s ease;
    }
</style>