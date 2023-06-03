import RootPresenter from './presenter/root-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import PointsApiService from './points-api-service.js';
import DestinationsApiService from './destinations-api-service.js';
import OffersApiService from './offers-api-service.js';

const AUTHORIZATION = 'Basic Kerzytyrj&Ljcnjtdcrbq';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FiltersModel();

const tripEventsContainer = document.querySelector('.trip-events');
const tripHeaderContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');


const rootPresenter = new RootPresenter({
  tripEventsContainer,
  tripHeaderContainer,
  filtersContainer
});

destinationsModel.init();
offersModel.init();
pointsModel.init();
rootPresenter.init(pointsModel, destinationsModel, offersModel, filtersModel);
