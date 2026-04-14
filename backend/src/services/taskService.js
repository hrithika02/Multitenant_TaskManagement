const prisma = require('../prisma');

exports.createTaskService = (data) => {
    return prisma.task.create({ data });
};

exports.getTasksService = (orgId) => {
    return prisma.task.findMany({
        where: { organizationId: orgId }
    });
};

exports.updateTaskService = (id, orgId, userId, data) => {
    return prisma.task.updateMany({
        where: {
            id,
            organizationId: orgId,
            createdById: userId
        },
        data
    });
};

exports.deleteTaskService = (id, orgId) => {
    return prisma.task.deleteMany({
        where: {
            id,
            organizationId: orgId
        }
    });
};