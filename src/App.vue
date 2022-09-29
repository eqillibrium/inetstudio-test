<script>
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'
	import MainLayout from './layout/MainLayout.vue'

	export default {
	setup () {
		const route = useRoute()
		const layout = computed(() => route.meta.layout)
		return {
			layout
		}
	},
		components: { MainLayout }
	}
</script>

<template>
	<component :is="`${layout}-layout`" v-if="layout"></component>
</template>
