<template>
  <div class="tree-container">
    <ul id="menu" v-show="menuVisible" @click="hideMenu">
      <li @click="addNode">创建子类型</li>
      <li @click="removeNode">删除该类型</li>
      <li @click="editNode">修改部门信息</li>
    </ul>
    <el-tree
      ref="tree"
      :data="treeData"
      node-key="deptId"
      :props="props"
      :highlight-current="true"
      @node-contextmenu="rihgtClick"
      @node-click="nodeClick"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i class="el-icon-location"></i>
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
    <el-dialog title="新增/编辑部门信息" @close="dialog.addNode = false" :visible.sync="dialog.addNode"
               :close-on-click-modal="false" width="700px">
      <add-node @close="closeAdd" @cancel="dialog.addNode = false" ref="addNode"></add-node>
    </el-dialog>
  </div>
</template>

<script>
  import addNode from './add_node'
  import arrayToTree from 'array-to-tree'
  import { deptController } from '@/controller/common/dept_controller'
  export default {
    data () {
      return {
        props: {
          label: 'name',
          children: 'children'
        },
        dialog: {
          addNode: false
        },
        menuVisible: false,
        doomObj: {},
        chosedObj: {}
      }
    },
    methods: {
      closeAdd () {
        this.dialog.addNode = false
        this.$emit('refresh')
      },
      // 删除节点
      removeNode () {
        this.$confirm('是否进行该操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const params = [this.chosedObj.deptId]
          deptController.delete(params).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功！")
              this.$emit('refresh')
            } else {
            }
          })
        }).catch(() => {})
      },
      addNode () {
        this.dialog.addNode = true
        this.$nextTick(() => {
          this.$refs.addNode.addInit(this.chosedObj)
        })
      },
      editNode () {
        this.dialog.addNode = true
        this.$nextTick(() => {
          this.$refs.addNode.editInit(this.chosedObj)
        })
      },
      // 弹框
      hideMenu (e) {
        this.menuVisible = false
        e.preventDefault()
      },
      nodeClick (data, node, obj) {
        this.menuVisible = false
        this.chosedObj = data
        // this.$emit('refresh')
      },
      rihgtClick (event, object, value, element) {
        this.chosedObj = object
        this.menuVisible = true
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.chosedObj.deptId)
        })
        let menu = document.querySelector('#menu')
        menu.style.left = event.clientX - this.doomObj.x + document.documentElement.scrollLeft + document.body.scrollLeft + 'px'
        menu.style.top = event.clientY - this.doomObj.y + 'px'
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        let query = document.querySelector('.tree-container')
        this.doomObj = query.getBoundingClientRect()
      })
      let _this = this
      document.body.onclick = function () {
        _this.menuVisible = false
      }
    },
    components: {addNode},
    filters: {},
    computed: {
      treeData () {
        let tempData = this.data.map(value => {
          if (value.deptId === 1) {
            value.parentId = null
          }
          return value
        })
        let treeData = arrayToTree(tempData, {
          parentProperty: 'parentId',
          customID: 'deptId'
        })
        return treeData
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .tree-container {
    position: relative;
  }

  #menu {
    position: absolute;
    background: #f5f5f5;
    border: 1px solid #979797;
    box-shadow: 2px 2px 2px #999;
    z-index: 999;
    & > li {
      display: block;
      padding: 0 2em;
      text-decoration: none;
      width: auto;
      color: #000;
      white-space: nowrap;
      line-height: 2.4em;
      text-shadow: 1px 1px 0 #fff;
      border-radius: 1px;
    }
    & > li:hover {
      cursor: pointer;
      background-color: #e8eff7;
      box-shadow: 0 0 2px #0a6aa1;
    }
  }
  /deep/ .el-tree-node__content {
    height: 36px;
  }
  /deep/ .el-tree-node__content:hover {
    background-color: #dcedfe;
  }
  /deep/
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
    background-color: #409EFF;
    color: #fff;
    .el-button--text {
      color: #fff;
    }
    /deep/ .my-icon {
      color: #fff;
    }
  }
</style>
