import { ChatzzService, getChatzzService} from './chatzz.service';

const getCustomChatzzService = (): ChatzzService => {return getChatzzService('http://localhost:3000/')};

export default getCustomChatzzService;
