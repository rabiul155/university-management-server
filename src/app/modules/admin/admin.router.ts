import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/', adminController.getAllAdmin);
router
  .route('/:id')
  .get(adminController.getSingleAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

export const adminRouter = router;
