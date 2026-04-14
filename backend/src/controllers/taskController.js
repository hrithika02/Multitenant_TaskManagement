const taskService = require('../services/taskService');

// ✅ CREATE TASK
exports.createTask = async (req, res) => {
    try {
        const task = await taskService.createTaskService({
            title: req.body.title,
            description: req.body.description,
            createdById: req.user.userId,
            organizationId: req.user.orgId
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ GET TASKS
exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasksService(req.user.orgId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ UPDATE TASK
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await taskService.updateTaskService(
            id,
            req.user.orgId,
            req.user.userId,
            req.body
        );

        if (result.count === 0) {
            return res.status(403).json({
                error: "Not allowed to update this task"
            });
        }

        res.json({ message: "Task updated ✅" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({
                error: "Only admin can delete tasks"
            });
        }

        await taskService.deleteTaskService(
            id,
            req.user.orgId
        );

        res.json({ message: "Task deleted ✅" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};