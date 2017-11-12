import Single from './single';
import Multi from './multi/index'; // почему-то без /index выдает ошибку, хотя все работает
import Tagging from './tagging';

export default Object.assign(Single, { Multi, Tagging });
