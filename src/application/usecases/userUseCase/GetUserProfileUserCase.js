import IUserRepo from "@/domain/repositories/IUserRepo";

class GetUserProfileUseCase {
    constructor(userRepo) {
        if (!(userRepo instanceof IUserRepo))
            throw new Error("userRepo must be instance of IUserRepo");
        this.userRepo = userRepo;
    }

    async run(token) {
        try {
            const userProfile = await this.userRepo.getUserProfile(token);
            return userProfile;
        } catch (error) {
            console.log("Error getting user profile:", error);
            throw error;
        }
    }
}

export default GetUserProfileUseCase;
