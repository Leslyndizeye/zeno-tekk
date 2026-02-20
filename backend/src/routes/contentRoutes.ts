import { Router } from "express";
import * as serviceController from "../controller/ServiceController";
import * as productController from "../controller/ProductController";
import * as teamMemberController from "../controller/TeamMemberController";
import * as testimonialController from "../controller/TestimonialController";
import * as contentController from "../controller/ContentController";

const router = Router();

// Services
router.get("/services", serviceController.getServices);
router.get("/services/all", serviceController.getAllServices);
router.post("/services", serviceController.createService);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

// Products
router.get("/products", productController.getProducts);
router.get("/products/all", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Team Members
router.get("/team", teamMemberController.getTeamMembers);
router.get("/team/all", teamMemberController.getAllTeamMembers);
router.post("/team", teamMemberController.createTeamMember);
router.put("/team/:id", teamMemberController.updateTeamMember);
router.delete("/team/:id", teamMemberController.deleteTeamMember);

// Testimonials
router.get("/testimonials", testimonialController.getTestimonials);
router.get("/testimonials/all", testimonialController.getAllTestimonials);
router.post("/testimonials", testimonialController.createTestimonial);
router.put("/testimonials/:id", testimonialController.updateTestimonial);
router.delete("/testimonials/:id", testimonialController.deleteTestimonial);

// Hero Content
router.get("/hero-content", contentController.getHeroContent);
router.put("/hero-content", contentController.updateHeroContent);

// Stats
router.get("/stats", contentController.getStats);
router.get("/stats/all", contentController.getAllStats);
router.post("/stats", contentController.createStat);
router.put("/stats/:id", contentController.updateStat);
router.delete("/stats/:id", contentController.deleteStat);

export default router;
