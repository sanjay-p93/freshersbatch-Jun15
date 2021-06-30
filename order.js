
	var itemList = [{id:1,name:"Cap",price:100,url:"cap.jpeg"},{id:2,name:"T-Shirt",price:300,url:"tshirt.jpeg"},{id:3,name:"Shoe",price:600,url:"shoe.jpeg"}];
	var orderlist={};




	for (let item of itemList){
		document.getElementById("item"+item.id).src = item.url;
		document.getElementById("item"+item.id+"Name").innerHTML = item.name;
		document.getElementById("item"+item.id+"Price").innerHTML = item.price;
		setAddButton(item.id);
	}

	clearCart();
	
	function clearCart(){
		document.getElementById("orderSummary").style.display = "none";
		for (let item of itemList){
			document.getElementById("cartItem"+item.id).style.display = "none";
		}
	}

	function clearlist(){
			orderlist={};
			for (let item of itemList){
				document.getElementById("item"+item.id+"Qty").value = "0";
				setAddButton(item.id);
			}
	}

	function setAddButton(id){
		document.getElementById("item"+id+"Qty").style.display = "none";
		document.getElementById("item"+id+"Add").style.display = "block";
	} 

	function resetAddButton(id){
		document.getElementById("item"+id+"Qty").style.display = "block";
		document.getElementById("item"+id+"Add").style.display = "none";
	}

	function listItem(id,qty){
		var amount=0;
		document.getElementById("cartItem"+id).style.display = "block";
		for (let i=0; i< itemList.length ;i++) {
			if(itemList[i].id == id){
				amount=itemList[i].price*qty;
				document.getElementById("cartItemName"+id).innerHTML = itemList[i].name+" X "+qty;
				document.getElementById("itemAmt"+id).innerHTML = amount.toFixed(2);
				return amount;
			}
		}
		return 0;
	}

	function isOrderlistEmpty(){
		console.log(Object.keys(orderlist).length);
		if(Object.keys(orderlist).length ==0){
			console.log(true);
			return true;
		}
		else{
			console.log(false);
			return false;
		}
	}
	

	function addItem(id){
		resetAddButton(id);
		document.getElementById("item"+id+"Qty").value = 1;
		updateOrderlist(id,1)
	}
	

	function updateOrderlist(id,qty){
		if(qty == 0){
			delete orderlist[id]; 
			setAddButton(id);
		}
		else{
			orderlist[id]=qty;
		}
	}	


	function placeOrder() {
		var total=0;
		clearCart();
		if(!isOrderlistEmpty()){
			document.getElementById("orderSummary").style.display = "block";
			for (let id in orderlist){
				total += listItem(id,orderlist[id]);
			}

			document.getElementById("totalAmount").innerHTML = total.toFixed(2);
		}	
		else{
			alert("Please select some items from the list!");
		}
	}


	function clearOrderlist(){
		console.log(!isOrderlistEmpty());
		if(!isOrderlistEmpty()){
			console.log("herhe");
			if (confirm("You are about to clear your cart!")) {
				clearlist();
				clearCart();
			}
		}
	}
