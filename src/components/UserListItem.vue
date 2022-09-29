<script setup lang="ts">
    import { ref } from 'vue'

    export interface Item {
        name: string
        text: string
        cityID: number
        imgUrl: string
        address: string
    }
    const item = defineProps<Item>()
    const show = ref(false)
</script>

<template>
    <el-row
    :gutter="10"
    class="text item">
        <el-col :span="4">
            <el-avatar :size="50" :src="item.imgUrl" @click="show = !show" style="cursor: pointer"/>
        </el-col>
        <el-col :span="20">
            <div class="data">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>{{ item.name }}</span>
                    <transition name="fade">
                        <span v-show="show">{{ item.address }}</span>
                    </transition>
                </div>
                <p>{{ item.text }}</p>
            </div>
        </el-col>
    </el-row>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>