//popup view function
// Finds all elements with class "popup-view"
var popupViews = document.querySelectorAll(".popup-view");
// Finds all elements with class "popup-btn"
var popupBtns = document.querySelectorAll(".popup-btn");
// Finds all elements with class "close-btn"
var closeBtns = document.querySelectorAll(".close-btn");

// Function to show popup
var popup = function (popupClick) {
  // Adds "active" class to the clicked popup view
  popupViews[popupClick].classList.add("active");
};

// Adds click event listener to each "popup-btn" element
popupBtns.forEach((popupBtn, i) => {
  popupBtn.addEventListener("click", () => {
    // Calls the popup function with index of clicked button
    popup(i);
  });
});

// Adds click event listener to each "close-btn" element
closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    // Removes "active" class from all popup views
    popupViews.forEach((popupView) => {
      popupView.classList.remove("active");
    });
  });
});

//Add to cart function

// Waits for the HTML content to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Initializes variables to track cart items and details
  let cartItemCount = 0,
    details = [],
    // Finds specific elements in the HTML document
    cartNotificationDot = document.querySelector(".notification-dot"),
    cartContainer = document.getElementById("cartKoBox"),
    pullCartIcon = document.querySelector(".SideCart"),
    productItems = document.querySelectorAll(".product");

  // Iterates over each product item
  productItems.forEach((product, index) => {
    // Finds quantity input and cart button for each product
    let quantityInput = product.querySelector("input[type='number']"),
      cartButton = product.querySelector(".product .Box .icons .icon1");

    // Adds event listener for quantity changes
    quantityInput.addEventListener("change", () => {
      // Ensures quantity is within valid range (1 to 99)
      let value = parseInt(quantityInput.value);
      if (isNaN(value) || value < 1) quantityInput.value = 1;
      else if (value > 99) quantityInput.value = 99;
    });

    // Adds event listener for adding item to cart
    cartButton.addEventListener("click", () =>
      add(index, parseInt(quantityInput.value))
    );
  });

  // Function to add item to the cart
  const add = (index, quantity) => {
    // Extracts item name and price from product details
    let itemName =
        productItems[index].querySelector(".Product-Name").textContent,
      itemPriceText = productItems[index].querySelector(".price").textContent,
      itemPrice = parseFloat(itemPriceText.replace("Rs.", "").trim());

    // Checks if item price is valid and quantity is positive
    if (!isNaN(itemPrice) && quantity > 0) {
      // Finds existing item in cart or adds new item
      let existingItem = details.find((item) => item.name === itemName);
      existingItem
        ? (existingItem.quantity += quantity)
        : details.push({
            name: itemName,
            price: itemPrice,
            quantity: quantity,
          });

      // Updates cart item count and refreshes cart display
      cartItemCount += quantity;
      updateCart();
    }
  };

  // Function to update cart
  const updateCart = () => {
    updateCartNotification(); // Updates cart notification dot
    updateCartDetails(); // Updates cart details
  };

  // Function to update cart notification dot
  const updateCartNotification = () => {
    if (cartNotificationDot) {
      // Displays cart notification dot with updated count
      cartNotificationDot.style.display = cartItemCount > 0 ? "block" : "none";
      cartNotificationDot.textContent =
        cartItemCount > 99 ? "99" : cartItemCount;
    }
  };

  // Function to update cart details
  const updateCartDetails = () => {
    let cartDetails = "", // Initializes cart details HTML string
      grandTotal = 0; // Initializes grand total price

    // Generates HTML for each item in the cart
    details.forEach((item, index) => {
      let totalPrice = item.price * item.quantity; // Calculates total price for current item
      // Constructs HTML for current item and appends to cart details string
      cartDetails += `<div class="itemDetail"><p class="itemDetails${
        index + 1
      }" style="font-size: 20px; line-height: 30px;

      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); ">${
        item.name
      } <br style="margin-top:20px; font-weight: lighter;"><span class="price-color">Rs. ${item.price.toFixed(
        2
      )} x ${item.quantity} = Rs. ${totalPrice.toFixed(
        2
      )}</p><button class="removeItem" data-index="${index}">&times;</button></div>`;
      grandTotal += totalPrice; // Updates grand total price
    });

    // Appends grand total HTML to cart details string
    cartDetails += `<div id="grandTotal">Total Amount = Rs. ${grandTotal.toFixed(
      2
    )}</div>`;

    // Updates cart details HTML in the document
    document.querySelector(".itemDetails").innerHTML = cartDetails;

    // Adds event listeners for remove buttons in cart
    document.querySelectorAll(".removeItem").forEach((button) =>
      button.addEventListener("click", function () {
        removeItem(parseInt(this.getAttribute("data-index"))); // Removes item from cart
      })
    );
  };

  // Function to remove item from cart
  const removeItem = (index) => {
    // Checks if index is valid
    if (index >= 0 && index < details.length) {
      // Updates cart item count and refreshes cart display
      cartItemCount -= details[index].quantity;
      details.splice(index, 1);
      updateCart();
    } else console.error("Error: Invalid index.");
  };

  
  // Adds event listener for cart icon click
  pullCartIcon.addEventListener("click", () => toggleCart());

  // Function to toggle cart visibility
  const toggleCart = () => {
    // Toggles cart visibility by changing CSS properties
    cartContainer.style.right === "0px"
      ? ((cartContainer.style.right = "-400px"),
        setTimeout(() => (cartContainer.style.display = "none"), 500))
      : ((cartContainer.style.display = "block"),
        setTimeout(() => (cartContainer.style.right = "0px"), 100));
  };

  // Adds event listener to hide cart when clicking outside of it
  document.body.addEventListener("click", (event) => {
    if (
      !cartContainer.contains(event.target) &&
      event.target !== pullCartIcon
    ) {
      // Hides cart if it's currently visible
      cartContainer.style.right === "0px" &&
        ((cartContainer.style.right = "-400px"),
        setTimeout(() => (cartContainer.style.display = "none"), 500));
    }
  });
});


//wishlist view
function togglePopup(element) {
  var popup = element.querySelector('.popuptext');
  popup.classList.toggle("show");
}