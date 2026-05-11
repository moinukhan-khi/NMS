const express = require('express');
const Group = require('../models/Group');
const auth = require('../middleware/auth');

const router = express.Router();

// گروپ بنائیں
router.post('/create', auth, async (req, res) => {
  try {
    const { name, description, members, isPrivate } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'براہ کرم گروپ کا نام درج کریں'
      });
    }

    const group = new Group({
      name,
      description: description || '',
      admin: req.userId,
      members: [req.userId, ...(members || [])],
      isPrivate: isPrivate || false
    });

    await group.save();
    await group.populate('admin', 'name email');
    await group.populate('members', 'name email avatar');

    res.status(201).json({
      message: 'گروپ بن گیا',
      group
    });
  } catch (err) {
    res.status(500).json({
      message: 'گروپ بنانے میں خرابی',
      error: err.message
    });
  }
});

// میری گروپز
router.get('/my-groups', auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.userId })
      .populate('admin', 'name email')
      .populate('members', 'name email avatar');

    res.json({
      message: 'گروپز ملیں',
      groups
    });
  } catch (err) {
    res.status(500).json({
      message: 'خرابی',
      error: err.message
    });
  }
});

// گروپ کی معلومات
router.get('/:groupId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate('admin', 'name email')
      .populate('members', 'name email avatar');

    if (!group) {
      return res.status(404).json({
        message: 'گروپ نہیں ملا'
      });
    }

    res.json({
      message: 'معلومات ملیں',
      group
    });
  } catch (err) {
    res.status(500).json({
      message: 'خرابی',
      error: err.message
    });
  }
});

// صارف شامل کریں
router.post('/:groupId/add-member', auth, async (req, res) => {
  try {
    const { memberId } = req.body;
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({
        message: 'گروپ نہیں ملا'
      });
    }

    if (group.admin.toString() !== req.userId) {
      return res.status(403).json({
        message: 'صرف ایڈمن صارفین شامل کر سکتے ہیں'
      });
    }

    if (group.members.includes(memberId)) {
      return res.status(400).json({
        message: 'صارف پہلے سے گروپ میں ہے'
      });
    }

    group.members.push(memberId);
    await group.save();
    await group.populate('members', 'name email avatar');

    res.json({
      message: 'صارف شامل ہو گیا',
      group
    });
  } catch (err) {
    res.status(500).json({
      message: 'خرابی',
      error: err.message
    });
  }
});

// صارف نکالیں
router.post('/:groupId/remove-member', auth, async (req, res) => {
  try {
    const { memberId } = req.body;
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({
        message: 'گروپ نہیں ملا'
      });
    }

    if (group.admin.toString() !== req.userId) {
      return res.status(403).json({
        message: 'صرف ایڈمن صارفین نکال سکتے ہیں'
      });
    }

    group.members = group.members.filter(m => m.toString() !== memberId);
    await group.save();

    res.json({
      message: 'صارف نکل گیا',
      group
    });
  } catch (err) {
    res.status(500).json({
      message: 'خرابی',
      error: err.message
    });
  }
});

module.exports = router;
