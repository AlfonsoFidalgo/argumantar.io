const followersRepo = require('../repos/followersRepo');
const usersRepo = require('../repos/usersRepo');

exports.followUser = async (req, res, next) => {
    const leaderId = req.params.userId;
    //check if user exists
    const leader = await usersRepo.findUserById(leaderId);
    if (leader.length !== 1){
        return res.status(404).json({message: 'User not found.'});
    };
    //check leaderId != followerId
    if (leader[0].id === req.userId){
        return res.status(403).json({message: 'Can\'t follow yourself.'});
    }
    //check follower doesn't already follow leader
    const follower = await followersRepo.checkFollowerElegibility(leader[0].id, req.userId);
    if (follower.length !== 0){
        return res.status(403).json({message: 'User already follows.'});
    }
    //create the follower
    const relationship = await followersRepo.followUser(leader[0].id, req.userId);
    return res.status(201).json({message: 'Success.'});
};

exports.unfollowUser = async (req, res, next) => {};