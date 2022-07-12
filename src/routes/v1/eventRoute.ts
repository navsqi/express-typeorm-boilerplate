import { Router } from 'express';
import { uploadBuffer } from '~/utils/uploadFile';

import * as eventController from '../../controllers/eventController';
import protect from '../../middlewares/protect';

const router = Router();

router.get('/', protect(), eventController.getEvent);
router.get('/:id', protect(), eventController.getEventById);
router.post('/', protect(), uploadBuffer([{ name: 'file', maxCount: 4 }]), eventController.createEvent);

export default router;
