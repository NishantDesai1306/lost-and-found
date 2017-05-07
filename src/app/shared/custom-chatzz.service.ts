import { ChatzzService, getChatzzService} from './chatzz.service';

const getCustomChatzzService = (): ChatzzService => {return getChatzzService('https://localhost:3000/', true)};

export default getCustomChatzzService;
