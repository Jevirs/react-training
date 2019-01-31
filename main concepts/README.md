# react-training

大家都在用react，出去都不好混，react traning , let it begin.

## main-concepts

记录下官网基本概念下的一些注意点：

### jsx

> 因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。例如，class 变成了 className，而 tabindex 则对应着 tabIndex。

> 组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。

jsx语法并不多难理解，有个别属性需要记忆；组建返回只能有一个根元素和vue单文件下template的限制一致

### props & state

> 所有的React组件必须像纯函数那样使用它们的props。

> 构造函数是唯一能够初始化 this.state 的地方。

> 因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

> 在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。

> JSX 标签内的任何内容都将通过 children 属性传入

 和vue中一致，因为数据流向的限制，子组件不能直接修改props，需要通过类似vue中的$emit来使父组件感知，只是react中这个方法从props中获取调用,children类似于vue中的slot

### event

> React事件绑定属性的命名采用驼峰式写法，而不是小写。

> 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。

> 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined

### 理念

> 让我们来看看每一条，找出哪一个是 state。每个数据只要考虑三个问题：
> 1.它是通过 props 从父级传来的吗？如果是，他可能不是 state。
> 2.它随着时间推移不变吗？如果是，它可能不是 state。
> 3.你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。

>对你应用的每一个 state：
>1.确定每一个需要这个 state 来渲染的组件。
>2.找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
>3.这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
>4.如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。

这是如何设计组件并组织起来的指导思想，state是一种可变的，组件的状态，而props是只读的数据，且只能通过父组件来修改。有多个组件依赖同一个状态时，这个state需要放倒这些组件的公共父组件中，即状态上移。