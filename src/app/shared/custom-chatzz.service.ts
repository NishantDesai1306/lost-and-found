import { ChatzzService, getChatzzService} from './chatzz.service';

const getCustomChatzzService = (): ChatzzService => {return getChatzzService('http://localhost:4200/')};

export default getCustomChatzzService;
