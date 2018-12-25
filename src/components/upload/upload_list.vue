<template>
	<div v-loading.fullscreen="loading" class="upload" :class="{'g-listpage__style' : !isDisabled}">
		<div v-if="!isDisabled" class="clearfix upload-title">
			<span>资料上传</span>
		</div>
		<el-alert v-if="!isDisabled"
			:title="memberType == 1 ? '请至少上传一张身份证及营业执照信息，每张不超过2MB。系统支持图片格式为：png、jpg、jpeg、bmp。' : ''"
			type="info"
			show-icon :closable="false">
		</el-alert>
		<el-form label-width="124px">
			<el-row v-for="item in $dict.findDictData('atttypid')" :key="item.id">
				<el-form-item :label="item.value" label-width="100px">
					<el-upload :ref="item.name" v-if="!isDisabled"
						class="upload-demo"
						:action="picAddress"
						:on-remove="handleRemove"
						:before-upload="beforeAvatarUpload"
						:on-preview="handlePictureCardPreview"
						list-type="picture"
						:data="{'atttypid': item.name, 'type': 2}"
						:http-request="fileUpload"
						:multiple="isMultiple">
						<el-button size="small"><i class="el-icon-upload2"></i> 上传文件</el-button>
					</el-upload>
					<div v-for="(v,index) in attinfo" :key="v.id">
						<div v-if="v.type === 1 && item.name == v.atttypid" class="view-img" @click="handlePictureCardPreview(v)">
							<img :src="v.url" alt="">
							<span v-text="v.resourceName"></span>
							<i v-if="!isDisabled" class="el-icon-close" @click.stop="removeImg(v,index,attinfo)"></i>
						</div>
					</div>
				</el-form-item>
			</el-row>
		</el-form>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<el-row v-if="!isDisabled">
			<el-button type='primary' @click="saveInfo">提交</el-button>
			<el-button @click='cancel'>取消</el-button>
		</el-row>
	</div>
</template>

<script>
import { ftpFileController } from "@/controller/common/file_controller";
import { resourceController } from "@/controller/common/resource_controller";
import { customerInfoController } from "@/controller/common/customerInfo_controller";
export default {
  data() {
    return {
      loading: false,
      picAddress: "",
			isMultiple: true,
			orderId: "",
			customerId: "",
			attinfo: [],
			imgInfo: [],
			dialogVisible: false,
			dialogImageUrl: "",
      // imgNum: 0,
			uploadState: true,
			memberType: ""
    };
	},
	created() {
		this.orderId = this.$route.query.orderId
		this.customerId = this.$route.query.customerId
		this.memberType = this.$route.query.memberType
		this.queryResource()
	},
	props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const imgType =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!imgType) {
        this.uploadState = false
        this.$message.error("图片只能是 png、jpg、jpeg、bmp 格式!");
      }
      if (!isLt2M) {
        this.uploadState = false
        this.$message.error("图片大小不能超过 2MB!");
      }
      return imgType && isLt2M;
    },
    fileUpload(param) {
			this.uploadState = true
			let data = {}
			// data.category =  param.data.category
			data.atttypid = param.data.atttypid
			data.ownerId = this.orderId
			data.ownerType = "order"
			data.type = 1

      var imgObj = param.file;
      var file = new FormData();
			file.append("file", imgObj);

      ftpFileController.upload(file).then(res => {
        if (res.status === 200) {
					// imgObj.id = res.data.id
					data.resourceId = res.data.newName
					data.resourceName = res.data.oldName
					data.resourceUrl = res.data.url

					imgObj.attname = res.data.oldName
					imgObj.atttypid = data.atttypid
					imgObj.imgurl = res.data.url
					resourceController.saveResource(data).then(res =>{
						if(res.status === 200) {
							imgObj.id = res.data
							this.imgInfo.push(imgObj);
							// this.imgNum++
							this.$message.success("上传成功！");
						} else {
							this.$message.error("文件上传失败！");
							this.$refs[data.atttypid].clearFiles()
						}
					})
				} else {
					this.$message.error("文件上传失败！");
					this.$refs[data.atttypid].clearFiles()
          
				}
      });
		},
    handleRemove(file, fileList) {
      if(this.uploadState) {
        let index
        for (var i = 0; i < this.imgInfo.length; i++) {
          if (this.imgInfo[i].uid === file.uid) {
            var resourceId = this.imgInfo[i].resourceId;
            var id = this.imgInfo[i].id;
            index = i
          }
        }
        this.delete(resourceId,id,index,this.imgInfo)
      }
		},
		removeImg(item,index,list) {
			this.delete(item.resourceUrl, item.id,index,list)
		},
		delete(resourceUrl, id,index,list) {
			ftpFileController.delete(resourceUrl).then(res => {
				if(res.status === 200) {
					resourceController.deleteResource({id: id}).then(res =>{
						if(res.status === 200) {
							this.$message.success("删除成功！");
							// this.imgNum--
							list.splice(index, 1);
						}
					})
				}
			});
		},
		queryResource() {
			let data = {
				ownerId: this.orderId,
				ownerType: "order",
				type : 1
			}
			resourceController.queryResource(data).then(res => {
				this.attinfo = res.data
				// this.imgNum = res.data.length
				this.attinfo.forEach(v => {
					v.url = ftpFileController.view()+ v.resourceUrl
					v.attname = v.resourceName
					v.imgurl = v.resourceUrl
				})
			})
		},
		handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
		},
		cancel() {
			this.$router.back(-1)
		},
		saveInfo() {
			this.attinfo = this.imgInfo.concat(this.attinfo)
			// 判断是否上传必填影像信息
			let atttypidList = []
			this.attinfo.forEach(v => {
				atttypidList.push(v.atttypid)
			})
			if(atttypidList.indexOf('2') == -1 || atttypidList.indexOf('4') == -1) {
				this.$message.info('请完善影像信息！')
			} else {
				customerInfoController.confirmResource({customerId:this.customerId}).then( res => {
					if(res.status === 200) {
						this.$message.success("提交成功！");
						this.$router.back(-1)
					}
				})
			}
			// if(this.imgNum > 0) {
			// } else {
			// 	this.$message.info('请至少上传一张图片')
			// }
		}
  }
};
</script>

<style lang="scss">
.upload {
	.upload-title {
		font-size: 16px;
		padding-bottom: 20px;
    margin-bottom: 20px;
		border-bottom: 1px solid #E6E6E6;
	}
	.el-alert.el-alert--info {
		margin-bottom: 14px;
		background-color: #E6F7FF;
		border: 1px solid #BAE7FF;
		.el-icon-info {
			color: #1890FF;
		}
	}
	.el-upload-list--picture {
		overflow: hidden;
		.el-upload-list__item {
			float: left;
			width: 230px;
			margin-right: 10px;
		}
	}
	.line {
		height: 16px;
		border-top: 1px solid #e6e6e6;
	}
	.view-img {
		float: left;
    width: 230px;
    margin-right: 10px;
		color: #606266;
		border: 1px solid #c0ccda;
    border-radius: 6px;
		margin-top: 10px;
    padding: 10px 10px 10px 90px;
    height: 92px;
		position: relative;
		img {
			width: 70px;
			height: 70px;
			vertical-align: middle;
			float: left;
			position: relative;
			z-index: 1;
			margin-left: -80px;
		}
		span {
			display: block;
    	margin-top: 20px;
			margin-right: 40px;
			overflow: hidden;
			padding-left: 4px;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.el-icon-close {
			display: none;
			width: 14px;
			height: 14px;
			position: absolute;
			top: 5px;
			right: 5px;
			cursor: pointer;
			opacity: .75;
		}
	}
	.view-img:hover {
		.el-icon-close {
			display: block;
		}
	}
}
</style>
