import './style.css'
import { Message, init } from "../lib/index";

const message = new Message();

init({
  durationTime: 3000
});

const demoContent = `
  <div class="demo-container">
    <h1 class="demo-title">@nanometer/nm 消息提示组件演示</h1>
    <p class="demo-desc">点击下方按钮查看不同类型的消息提示效果</p>
    
    <div class="demo-section">
      <h2>基础消息类型</h2>
      <div class="demo-buttons">
        <button id="btn-success" class="btn btn-success">Success 成功</button>
        <button id="btn-warning" class="btn btn-warning">Warning 警告</button>
        <button id="btn-info" class="btn btn-info">Info 提示</button>
        <button id="btn-error" class="btn btn-error">Error 错误</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>不同显示时长</h2>
      <div class="demo-buttons">
        <button id="btn-short" class="btn btn-info">短时间 (1秒)</button>
        <button id="btn-long" class="btn btn-info">长时间 (5秒)</button>
        <button id="btn-noclose" class="btn btn-info">不自动关闭</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>带后缀的消息</h2>
      <div class="demo-buttons">
        <button id="btn-suffix" class="btn btn-warning">带后缀按钮</button>
        <button id="btn-suffix-close" class="btn btn-error">带关闭按钮</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>队列测试</h2>
      <div class="demo-buttons">
        <button id="btn-queue" class="btn btn-success">连续发送多条消息</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>自定义样式</h2>
      <div class="demo-buttons">
        <button id="btn-custom" class="btn btn-info">自定义样式</button>
      </div>
    </div>
  </div>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = demoContent

document.getElementById('btn-success')!.addEventListener('click', () => {
  message.show({
    type: 'success',
    content: '操作成功！数据已保存。',
    durationTime: 3000
  })
})

document.getElementById('btn-warning')!.addEventListener('click', () => {
  message.show({
    type: 'warning',
    content: '警告：您的操作可能会导致数据丢失！',
    durationTime: 3000
  })
})

document.getElementById('btn-info')!.addEventListener('click', () => {
  message.show({
    type: 'info',
    content: '提示：这是一条普通的消息提示。',
    durationTime: 3000
  })
})

document.getElementById('btn-error')!.addEventListener('click', () => {
  message.show({
    type: 'error',
    content: '错误：网络连接失败，请重试！',
    durationTime: 3000
  })
})

document.getElementById('btn-short')!.addEventListener('click', () => {
  message.show({
    type: 'info',
    content: '这条消息只显示 1 秒',
    durationTime: 1000
  })
})

document.getElementById('btn-long')!.addEventListener('click', () => {
  message.show({
    type: 'info',
    content: '这条消息显示 5 秒',
    durationTime: 5000
  })
})

document.getElementById('btn-noclose')!.addEventListener('click', () => {
  message.show({
    type: 'info',
    content: '这条消息不会自动关闭，需要手动关闭',
    durationTime: false
  })
})

document.getElementById('btn-suffix')!.addEventListener('click', () => {
  message.show({
    type: 'warning',
    content: '确定要删除这个文件吗？',
    durationTime: 5000,
    suffix: '撤销',
    suffixEvent: ({ close }) => {
      console.log('点击了撤销按钮')
      close()
    }
  })
})

document.getElementById('btn-suffix-close')!.addEventListener('click', () => {
  const { close } = message.show({
    type: 'error',
    content: '操作失败，请检查网络连接',
    durationTime: false,
    suffix: '关闭',
    suffixEvent: ({ close }) => {
      close()
    }
  })
})

document.getElementById('btn-queue')!.addEventListener('click', () => {
  message.show({ type: 'info', content: '消息 1 - 开始测试队列' })
  setTimeout(() => {
    message.show({ type: 'success', content: '消息 2 - 第二条消息' })
  }, 300)
  setTimeout(() => {
    message.show({ type: 'warning', content: '消息 3 - 第三条消息' })
  }, 600)
  setTimeout(() => {
    message.show({ type: 'error', content: '消息 4 - 最后一条' })
  }, 900)
})

document.getElementById('btn-custom')!.addEventListener('click', () => {
  message.show({
    type: 'info',
    content: '这是一条自定义样式的消息',
    durationTime: 3000,
    class: 'custom-message'
  })
})
