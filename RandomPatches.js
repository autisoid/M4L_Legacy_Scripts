///api_version=2
(script = registerScript({
    name: "RandomPatches",
    authors: ["xWhitey"],
    version: "1.337"
})).import("Core.lib");

module = {
    values: [
        m4linventorymovesneakingfix = value.createBoolean("M4L-InventoryMove-Sneaking-Fix", true),
        m4lworldchangeramleakfix = value.createBoolean("M4L-WorldChange-RamLeak-Fix", true)
    ],
    onUpdate: function() {
        //mc.thePlayer.ticksExisted % 3 == 0 && sendPacket(new CPacketEntityAction(mc.thePlayer, CPacketEntityAction.Action.START_FALL_FLYING))
        mc.thePlayer.removePotionEffect(MobEffects.INVISIBILITY) && mc.thePlayer.setVisible(true)
    },
    onKey: function(e) {
        m4linventorymovesneakingfix.get() && mc.currentScreen && (mc.gameSettings.keyBindSneak.pressed = false)
    },
    onWorld: function(e) {
        m4lworldchangeramleakfix.get() && java.lang.System.gc()
    }
}