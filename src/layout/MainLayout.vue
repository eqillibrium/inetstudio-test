<template>
    <el-container style="min-height: 100vh">
		<el-main>
			<router-view></router-view>
		</el-main>
		<el-footer class="footer">
			{{ new Date().getFullYear() }} — <strong> Footer</strong>
		</el-footer>
    </el-container>
</template>
  
<style>
	.footer {
		margin-top: auto;
		min-height: 50px;
		background-color: pink;
		display: flex;
		justify-content: center;
		align-items: center;
		color: dimgray;
	}
</style>