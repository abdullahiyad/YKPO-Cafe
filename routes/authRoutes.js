const { Router } = require("express");
const authController = require("../controller/authController");
const { isLoggedIn, upload } = require("../middleware/authMiddlewares");
const router = Router();

// signup links
router.get("/signup", isLoggedIn, authController.signup_get);
router.post("/signup", authController.signup_post);

// login links
router.get("/login", isLoggedIn, authController.login_get);
router.post("/login", authController.login_post);

// home links
router.get("/home", authController.home_get);
router.get("/home/api", authController.switch_page);

// menu links
router.get("/menu", authController.menu_get);
router.get("/menu/api", authController.menu_data_get);
router.get("/menu/", authController.switch_page);
router.get("/checkout", authController.checkOut);
router.post("/menu/checkout", authController.checkOut_post);

// dashboard admin links
router.get("/admin/dashboard", authController.dashboard_get);
router.post("/admin/dashboard", authController.dashboard_post);

//customer admin links
router.get("/admin/customer", authController.customer_get);
router.get("/admin/customer/api", authController.customer_data_get);
router.delete("/admin/customer", authController.delete_user_email); //this for delete user.

// products for admin links
router.get("/admin/products", authController.products_get);
router.get("/admin/products/api", authController.products_data_get);
router.post(
  "/admin/products",
  upload.single("product-image"),
  authController.products_post
);
router.delete("/admin/products", authController.delete_product_id);
router.put(
  "/admin/products",
  upload.single("choose-file"),
  authController.edit_product
);

// logout admin dashboards
router.post("/admin/customer/logout", authController.logout_Del_Cookie);
router.post("/admin/dashboard/logout", authController.logout_Del_Cookie);
router.post("/admin/messages/logout", authController.logout_Del_Cookie);
router.post("/admin/product/logout", authController.logout_Del_Cookie);
router.post("/admin/profile/logout", authController.logout_Del_Cookie);
router.post("/admin/orders/logout", authController.logout_Del_Cookie);

// admin profile links
router.get("/admin/profile", authController.admin_profile_get);
router.get("/admin/profile/api", authController.admin_profile_get_api);
router.put("/admin/profile", authController.update_profile_data);
router.delete("/admin/profile", authController.delete_loggedIn_user);

// admin messages
router.get("/admin/messages", authController.messages_get);
router.get("/admin/messages/api", authController.messages_data_get);
router.put("/admin/messages", authController.message_acc_rej);

router.get("/reservation", authController.reservation_get);
router.get("/reservation/api", authController.switch_page);
router.post("/reservation", authController.reservation_post);

// logout user dashboards
router.post("/user/profile/logout", authController.logout_Del_Cookie);
router.post("/user/reservation/logout", authController.logout_Del_Cookie);
router.post("/user/orders/logout", authController.logout_Del_Cookie);
router.post("/user/dashboard/logout", authController.logout_Del_Cookie);

// user profile links
router.get("/user/profile", authController.user_profile_get);
router.get("/user/messages", authController.user_reservation_get);
router.put("/user/profile", authController.update_profile_data);
router.delete("/user/profile", authController.delete_loggedIn_user);
router.get("/user/profile/api", authController.user_profile_get_api);
router.get("/user/orders", authController.get_user_orders);
router.get("/user/messages/api", authController.get_user_messages);
router.get("/user/orders/api", authController.get_orders_user_data);

// This is for test notifications
router.get("/user/dashboard", authController.user_dashboard_get);
// router.post('/user/dashboard', authController.subscription_post);
// admin orders
router.get("/admin/orders", authController.getOrders);
router.get("/admin/orders/api", authController.get_orders_data);

module.exports = router;