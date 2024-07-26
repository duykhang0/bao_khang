// Lấy chuỗi truy vấn từ URL
const queryString = window.location.search;

// Tạo đối tượng URLSearchParams
const params = new URLSearchParams(queryString);
const id = params.get('id'); // "value1"

// get product detail
const getDetailShoe = async () => {
    
    try{
        const response = await axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`)
        const data = response.data.content;
        const detail_product = document.getElementById("detail");
        detail_product.innerHTML = `
            <div class="detail_product" id="detail_product">
                <img src=${data.image} alt="">
                <div class="detail_content">
                    <h1 class="product_name">${data.name}</h1>
                    <p class="product_decs">${data.description}</h3>
                    <div class="size">
                        ${
                            data.size.map((item) => {
                                 return `<button>${item}</button>`
                            })
                        }
                        
                        
                    </div>
                    <p class="price">${data.price}$</p>
                    <div class="quantity">
                        <button>-</button>
                        <input type="number" value="1">
                        <button>+</button>
                    </div>
                    <button class="add_to_card">Add to card</button>
                </div>
                </div>
        `
        
    }catch(error){
        console.log(error)
    }
}

//get sản phẩm liên quan
const getRelateProduct = async () => {
    try{
        const response = await axios.get(`https://shop.cyberlearn.vn/api/Product`)
        const datas = response.data.content
        const product__content = document.getElementById('product__content');
        var htmlString =``;
        
        datas.map((data) => {
            console.log(data)
              htmlString += `
                <div class="product__item">
                    <img src="${data.image}" alt="" />
                    <h3>${data.name}</h3>
                    <p>${data.shortDescription}</p>
                    <div class="group__action">
                    <div class="action__buyNow">
                        <a href="./detail.html?id=${data.id}">Buy Now</a>
                    </div>
                    <div class="action__price">
                        <p>${data.price}$</p>
                    </div>
                    </div>
                </div>
                `
            return htmlString
        })
        
        product__content.innerHTML = htmlString
    }catch(error){
        console.log(error)
    }
}
getRelateProduct()
getDetailShoe();






