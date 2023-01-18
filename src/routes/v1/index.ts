import { Router } from 'express';

import authRoute from './authRoute';
import userRoute from './userRoute';
import instansiRoute from './instansiRoute';
import outletRoute from './outletRoute';
import mouRoute from './mouRoute';
import assignmentRoute from './assignmentInstansiRoute';
import eventRoute from './eventRoute';
import produkRoute from './produkRoute';
import leadsRoute from './leadsRoute';
import masterMenuRoute from './masterMenuRoute';
import masterMenuRoleRoute from './masterMenuRoleRoute';
import roleRoute from './roleRoute';
import reportRoute from './reportRoute';
import testingRoute from './testingRoute';
import dashboardRoute from './dashboardRoute';
import pkiRoute from './pkiRoute';
import promoRoute from './promoRoute';

import promoVoucherRoute from './promoVoucherRoute';
import promoMicrositeRoute from './promoMicrositeRoute';
import klaimMoRoute from './klaimMoRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/instansi', instansiRoute);
router.use('/outlet', outletRoute);
router.use('/mou', mouRoute);
router.use('/event', eventRoute);
router.use('/assignment-instansi', assignmentRoute);
router.use('/produk', produkRoute);
router.use('/leads', leadsRoute);
router.use('/master-menu', masterMenuRoute);
router.use('/master-menu-role', masterMenuRoleRoute);
router.use('/role', roleRoute);
router.use('/report', reportRoute);
router.use('/dashboard', dashboardRoute);
router.use('/testing', testingRoute);
router.use('/pki', pkiRoute);
router.use('/promo', promoRoute);

router.use('/promovoucher', promoVoucherRoute);
router.use('/promomicrosite', promoMicrositeRoute);
router.use('/klaimmo', klaimMoRoute);

export default router;
