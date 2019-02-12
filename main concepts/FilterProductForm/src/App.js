import React from 'react';
import './App.css';


/* 每一项item，只负责渲染内容，根据stocked定义样式 */
class ProductItem extends React.Component {

	render() {
		let style = {
			color: this.props.product.stocked ? 'red' : 'black'
		}

		return (
			<li>
				<span style={style}>{this.props.product.name}</span>
				<span>{this.props.product.price}</span>
			</li>
		)
	}
}

/* 负责渲染某一目录下的标题与列表 */
class ProductList extends React.Component {

	render() {
		let products = this.props.products || [];
    let category = this.props.category || 'none';
    
		let list = products.map((item, index) => 
			<ProductItem product={item} key={index} />
		);
		
		return (
			<div>
				<h3>{category}</h3>
				<ul>
					{list}
				</ul>
			</div>
		)
	}
}

/* 根据筛选值，将原数据分类，筛选 */
class ProductTable extends React.Component {

	render() {
		let maps = {};
		let products = this.props.products;
		let keyword = this.props.keyword;
		let onlyStocked = this.props.onlyStocked;

		products.forEach(element => {
			/* 不符合条件的剔除 */
			if(element.name.indexOf(keyword) === -1 || (onlyStocked && !element.stocked)) return;
			if(maps[element.category]){
				maps[element.category].push(element);
			}else{
				maps[element.category] = [];
				maps[element.category].push(element);
			}
		});

    let lists = Object.keys(maps).map((item, index) => <ProductList category={item} products={maps[item]} key={item}/>)

		return (
			<div>
				<p>
					<span>Name</span>
					<span>Price</span>
				</p>
				{lists}
			</div>
		)
	}
}

/* keyword,onlyStocked 在这里会根据用户输入做出改变，需要通过父组件的回调函数通知父组件改变state */
class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleKeywordChange = this.handleKeywordChange.bind(this);
		this.handleStockedChange = this.handleStockedChange.bind(this);
	}

	handleKeywordChange(e){
		this.props.onKeywordChange(e.target.value);
	}

	handleStockedChange(e){
    console.log(e.target.checked)
		this.props.onStockedChange(e.target.checked);
	}

	render() {
		return (
			<div>
				<input type="text" maxLength="20" value={this.props.keyword} onChange={this.handleKeywordChange}></input>
				<div>
					<label htmlFor="stock">Only show products in stock:</label>
					<input type="checkbox" name="stock" checked={this.props.onlyStocked} onChange={this.handleStockedChange}></input>
				</div>
			</div>
		)
	}
}

/* 关键字，是否显示库存应该在最本层定义，因为在搜索框中使用后会影响到表格的显示，所以是公共依赖 */
class FilterProductForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			onlyStocked: ''
		};
		this.handleKeywordChange = this.handleKeywordChange.bind(this);
		this.handleStockedChange = this.handleStockedChange.bind(this);
	}

	handleKeywordChange(text) {
		this.setState({
			keyword: text
		})
	}

	handleStockedChange(value) {
    console.log('set checkbox value:' + value)
		this.setState({
			onlyStocked: value
		})
	}

	render() {
		return (
			<div>
				<SearchBar
					keyword={this.state.keyword}
					onlyStocked={this.state.onlyStocked}
					onKeywordChange={this.handleKeywordChange}
					onStockedChange={this.handleStockedChange}
				></SearchBar>
				<ProductTable
					products={this.props.products}
					keyword={this.state.keyword}
					onlyStocked={this.state.onlyStocked}
				></ProductTable>
			</div>
		)
	}
}


export default FilterProductForm;
