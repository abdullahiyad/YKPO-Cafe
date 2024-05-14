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
router.get("/home/api", authController.home_get_data);

// menu links
router.get("/menu", authController.menu_get);
router.post("/menu", authController.menu_post);
router.get("/menu/api", authController.menu_data_get);

// dashboard admin links
router.get("/admin/dashboard", authController.dashboard_get);
router.post("/admin/dashboard", authController.dashboard_post);

//customer admin links
router.get("/admin/customer", authController.customer_get);
router.get("/admin/customer/api", authController.customer_data_get);
router.post("/admin/customer", authController.customer_post); //this for create user
router.put("/admin/customer", authController.update_user_data); //this for update data of user
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

// logout
router.post('/admin/customer/logout', authController.logout_Del_Cookie);
router.post('/admin/dashboard/logout', authController.logout_Del_Cookie);

// admin profile links
router.get('/admin/profile', authController.admin_profile_get);
router.get('/admin/profile/api', authController.admin_profile_get_api);
router.post('/admin/profile',  authController.admin_profile_post);
router.put('/admin/profile',  authController.update_profile_data);
router.delete('/admin/profile',  authController.delete_loggedIn_user);

module.exports = router;
