<template>
  <div class="overview">
    <card title="关于">
      <div class="c-left">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </card>

    <card title="技术栈">
      <div class="text-link">
        <template v-for="item in technologyStacks" :key="item">
          <div class="item">
            <span class="title">{{ item.title }} :</span>
            <el-link type="primary">{{ item.desp }}</el-link>
          </div>
        </template>
      </div>
      <!-- 生产环境依赖 -->
      <div class="description">
        <el-descriptions title="生产环境依赖" :column="2" border>
          <template v-for="item in dependencies" :key="item">
            <el-descriptions-item>
              <template #label>{{ item.name }}</template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
      <!-- 开发环境依赖 -->
      <div class="description">
        <el-descriptions title="开发环境依赖" :column="2" border>
          <template v-for="item in devDependencies" :key="item">
            <el-descriptions-item>
              <template #label>{{ item.name }}</template>
              <el-tag size="small">{{ item.description }}</el-tag>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </card>

    <card title="项目结构">
      <div class="c-left">
        <LzCode language="bash" :code="projectDir"></LzCode>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import card from '@/base-ui/card/card.vue'
import LzCode from '@/base-ui/code/code.vue'
import {
  projectDir,
  technologyStacks,
  dependencies,
  devDependencies
} from './config'
</script>

<style scoped lang="less">
.overview {
  .c-left {
    text-align: left;
  }

  .el-card {
    margin-bottom: 20px;
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-card__header span) {
      // ::v-deep .el-card__header span {
      font-weight: 700;
    }
  }

  .description {
    // ::v-deep 重写 element-plus 样式
    &:deep(.el-descriptions__title) {
      // ::v-deep .el-descriptions__title {
      font-weight: 400;
    }
  }
  .description {
    margin-bottom: 20px;
  }
}
.text-link {
  padding: 0 15px;
  margin-bottom: 40px;
  text-align: left;
  .title {
    position: relative;
    display: inline-block;
    margin-right: 20px;
  }
  .item {
    margin: 5px;
  }

  .title::before {
    position: absolute;
    top: 40%;
    left: -15px;
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 100%;
    content: '';
  }
}
</style>
