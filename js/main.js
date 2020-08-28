$(document).ready(function () {
  class Product {
    constructor(_id, _name, _type, _size, _img, _description) {
      this.id = _id;
      this.name = _name;
      this.type = _type;
      this.size = _size;
      this.img = _img;
      this.description = _description;
    }
  }
  class ProductList {
    constructor() {
      this.pList = [];
    }
  }
  ProductList.prototype.addProduct = function (item) {
    this.pList.push(item);
    return ProductList;
  };

  // --------------------------------------------------------//
  // --------------------------------------------------------//

  //------------- GLOBAL VARIABLE ----------------//

  // --------------------------------------------------------//
  // --------------------------------------------------------//
  let pList = new ProductList();
  // GET DATA
  async function getData() {
    try {
      const res = await axios.get("./data/data.json");
      return res.data.Product;
    } catch (error) {}
  }
  // INCLUDE FUNCTION
  // MIX IT UP
  let mixItUp = function () {
    var containerEl = document.querySelector(".__product-list");
    var mixer = mixitup(containerEl);
  };

  // CREATE LIST PRODUCT
  const createProductList = () => {
    let list = getData()
      .then((res) => {
        let list = new ProductList();
        for (let item of res) {
          let product = new Product(
            item.id,
            item.name,
            item.type,
            item.size,
            item.img,
            item.description
          );
          list.addProduct(product);
        }
        return list.pList;
      })
      .catch((err) => {
        console.log(err);
      });
    return list;
  };
  // RENDER HTML
  const renderProductListHTML = () => {
    createProductList()
      .then((res) => {
        // render html for >= MD SCREEN
        // console.log("first res: ", res);
        let content = "";
        let result = res.reduce(function (item, item2) {
          content += `
          <div class="mix ${item2.type[0]} col-sm-6 col-md-4 col-xl-3" id="${item2.id}">
            <div class="product-item">           
              <div class="product-img img-item-${item2.id}">
              </div>
              <div class="product-title">
                <h5>${item2.name}</h5>
                <p>Giá: Liên hệ</p>              
              </div>
              <div class="product-btn-container">
                <button class="btn product-btn">Xem thêm</button>
              </div>
            </div>
          </div>         
          `;
          return content;
        }, "");

        $(".product-list-container").html(result);
        for (let item of res) {
          let itemID = `.img-item-${item.id}`;
          $(itemID).css("background-image", `url(${item.img[0]})`);
        }

        // Call MixItUp to use
        mixItUp();

        // Include CUSTOM SCROLLBAR
        $("#product-list-scrollbar").mCustomScrollbar({
          theme: "dark",
        });

        let rMo = "";
        let rOther = "";
        // filter nhung san pham la mo
        let moFilter = res.filter((res) => res.type[0].includes("mo-"));
        // filter nhung san pham khac mo
        let otherFilter = res.filter((res) => !res.type[0].includes("mo-"));

        // render html carousel mo
        let resMo = moFilter.reduce(function (item, item2) {
          rMo += `
          <div class="${item2.type[0]}" id="${item2.id}">
            <div class="product-item">
            <div class="product-img img-item-${item2.id}">
              </div>
              <div class="product-title">
                <h5>${item2.name}</h5>
                <p>Giá: Liên hệ</p>
              </div>
              <div class="product-btn-container">
                <button class="btn product-btn">Xem thêm</button>
              </div>
            </div>
          </div>
          `;
          return rMo;
        }, "");

        // render html carousel other
        let resOther = otherFilter.reduce(function (item, item2) {
          rOther += `
          <div class="${item2.type[0]}" id="${item2.id}">
            <div class="product-item">
              <div class="product-img img-item-${item2.id}">
              </div>
              <div class="product-title">
                <h5>${item2.name}</h5>
                <p>Giá: Liên hệ</p>
              </div>
              <div class="product-btn-container">
                <button class="btn product-btn">Xem thêm</button>
              </div>
            </div>
          </div>
          `;
          return rOther;
        }, "");

        // DOM HTML
        $("#pList-mo").html(rMo);
        $("#pList-other").html(resOther);
        myCarouselStart("#pList-mo", 3, 3, 3);
        myCarouselStart("#pList-other", 3, 3, 3);
        for (let item of res) {
          let itemID = `.img-item-${item.id}`;
          $(itemID).css("background-image", `url(${item.img[0]})`);
        }
        // BTN product EVENT
        $(".product-btn").click(function () {
          let pID = $(this).parent().parent().parent()[0].id;
          let productItem = res.filter((res) => res.id === pID)[0];
          let pModalImgHTML = "";
          // render BackgroundImage
          let pModalImg = productItem.img.reduce(function (item1, item2) {
            pModalImgHTML += `
            <div class="item" style="background-image: url('${item2.substr(
              1
            )}');"></div>
            `;
            return pModalImgHTML;
          }, "");

          $(".product-modal-img").html(pModalImg);
          $(".p-name-value").html(productItem.name);
          $(".p-type-value").html(productItem.type[1]);
          $(".p-size-value").html(productItem.size);
          $(".p-description-value").html(productItem.description);
          // START CAROUSEL
          myCarouselStart(".product-modal-img", 1, 1, 1);
          // render owl-dot background-image
          let owlDot = $(".product-modal-img .owl-dots").children();
          for (let i = 0; i < owlDot.length; i++) {
            owlDot[i].setAttribute(
              "style",
              `background-image: url('${productItem.img[i].substr(1)}');`
            );
          }
          $(".product-modal").show();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var waypoint1 = new Waypoint({
    element: document.getElementById("xdvd1"),
    handler: function (direction) {
      $("#xdvd1")
        .children()
        .children()
        .css("opacity", "1")
        .css("transform", "translateX(0%)");
    },
    offset: "bottom-in-view",
  });
  var waypoint2 = new Waypoint({
    element: document.getElementById("xdvd2"),
    handler: function (direction) {
      $("#xdvd2")
        .children()
        .children()
        .css("opacity", "1")
        .css("transform", "translateX(0%)");
    },
    offset: "bottom-in-view",
  });
  var waypoint3 = new Waypoint({
    element: document.getElementById("xdvd3"),
    handler: function (direction) {
      $("#xdvd3")
        .children()
        .children()
        .css("opacity", "1")
        .css("transform", "translateX(0%)");
    },
    offset: "bottom-in-view",
  });
  function myCarouselStart(dom, res1, res2, res3) {
    myCarousel = $(dom).owlCarousel({
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 2200,
      smartSpeed: 700,
      nav: true,
      responsive: {
        0: {
          items: res1,
        },
        576: {
          items: res2,
        },
        768: {
          items: res3,
        },
      },
    });
  }
  function scrollSpy() {
    let section = document.querySelectorAll(".section");
    let sections = {};
    let i = 0;

    Array.prototype.forEach.call(section, function (e) {
      sections[e.id] = e.offsetTop;
    });

    window.onscroll = function () {
      let scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (i in sections) {
        if (sections[i] <= scrollPosition) {
          $(".nav-item.active").removeClass("active");
          // let aToActive = document.querySelector(`a[href*="${i}"]`);
          // console.log(aToActive);
          let aToActive = document.querySelector(`a[href*="${i}"]`).parentNode;
          aToActive.setAttribute("class", "nav-item active");
        }
      }
    };
  }

  // -------------------------CALL FUNCTION -------------------//
  renderProductListHTML();
  scrollSpy();
});
