import Vue from "vue";
let vm = new Vue()

// 成功
export function successAlert(msg){
  vm.$message({
    message: msg,
    type: 'success'
  });
}

// 失败
export function warningAlert(msg){
  vm.$message({
    message: msg,
    type: 'warning'
  });
}