import { ChatzzService, getChatzzService} from './chatzz.service';

const getCustomChatzzService = (): ChatzzService => {return getChatzzService('https://lost-box.herokuapp.com/', true)};

export default getCustomChatzzService;
