import { Router } from "express";
import * as serviceController from "../controller/ServiceController";
import * as productController from "../controller/ProductController";
import * as teamMemberController from "../controller/TeamMemberController";
import * as testimonialController from "../controller/TestimonialController";
import * as contentController from "../controller/ContentController";
import * as blogController from "../controller/BlogController";
import * as contactController from "../controller/ContactController";
import * as analyticsController from "../controller/AnalyticsController";
import * as financeController from "../controller/FinanceController";
import { authenticateToken } from "../middleware/JwtParsing";

const router = Router();

// Services
router.get("/services", serviceController.getServices);
router.get("/services/all", serviceController.getAllServices);
router.post("/services", authenticateToken, serviceController.createService);
router.put("/services/:id", authenticateToken, serviceController.updateService);
router.delete("/services/:id", authenticateToken, serviceController.deleteService);

// Products
router.get("/products", productController.getProducts);
router.get("/products/all", productController.getAllProducts);
router.post("/products", authenticateToken, productController.createProduct);
router.put("/products/:id", authenticateToken, productController.updateProduct);
router.delete("/products/:id", authenticateToken, productController.deleteProduct);

// Team Members
router.get("/team", teamMemberController.getTeamMembers);
router.get("/team/all", teamMemberController.getAllTeamMembers);
router.post("/team", authenticateToken, teamMemberController.createTeamMember);
router.put("/team/:id", authenticateToken, teamMemberController.updateTeamMember);
router.delete("/team/:id", authenticateToken, teamMemberController.deleteTeamMember);

// Testimonials
router.get("/testimonials", testimonialController.getTestimonials);
router.get("/testimonials/all", testimonialController.getAllTestimonials);
router.post("/testimonials", authenticateToken, testimonialController.createTestimonial);
router.put("/testimonials/:id", authenticateToken, testimonialController.updateTestimonial);
router.delete("/testimonials/:id", authenticateToken, testimonialController.deleteTestimonial);

// Hero Content
router.get("/hero-content", contentController.getHeroContent);
router.put("/hero-content", authenticateToken, contentController.updateHeroContent);

// Stats
router.get("/stats", contentController.getStats);
router.get("/stats/all", contentController.getAllStats);
router.post("/stats", authenticateToken, contentController.createStat);
router.put("/stats/:id", authenticateToken, contentController.updateStat);
router.delete("/stats/:id", authenticateToken, contentController.deleteStat);

// Blog Posts
router.get("/blog", blogController.getPosts);
router.get("/blog/all", blogController.getAllPosts);
router.post("/blog", authenticateToken, blogController.createPost);
router.put("/blog/:id", authenticateToken, blogController.updatePost);
router.delete("/blog/:id", authenticateToken, blogController.deletePost);

// Contact Messages
router.post("/contact", contactController.createContact);
router.get("/contact/all", authenticateToken, contactController.getAllContacts);
router.patch("/contact/:id/read", authenticateToken, contactController.toggleContactRead);
router.delete("/contact/:id", authenticateToken, contactController.deleteContact);

// Analytics
router.post("/analytics/track", analyticsController.trackPageView);
router.get("/analytics/summary", authenticateToken, analyticsController.getAnalyticsSummary);

// Finance — summary must come before :id
router.get("/finance/summary", authenticateToken, financeController.getSummary);
router.get("/finance", authenticateToken, financeController.getEntries);
router.post("/finance", authenticateToken, financeController.createEntry);
router.put("/finance/:id", authenticateToken, financeController.updateEntry);
router.delete("/finance/:id", authenticateToken, financeController.deleteEntry);

export default router;
