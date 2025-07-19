///api_version=2
(script = registerScript({
    name: "Gay",
    authors: ["xWhitey"],
    version: "1.337"
})).import("Core.lib");

var autols = [
    "и все вы пидроин",
    "с помойного видраса",
    "хуйграда",
    "соси",
    "купи минты",
    "муйряса",
    "гарри поттер и ДИ НАХУЙ",
    "хахаха ез4",
    "отполируй мой хуй еззка",
    "купола",
    "атлеты",
    "у тебя дед помер",
    "слон",
    "фууу жир",
    "умрииии",
    "похудей жирный пж от тебя воняет жиром",
    "да расплодяйтесь деды в загребенье нашем провославном",
    "деды воевали",
    "котак",
    "я тис",
    "еззка я тебя на рек отпинал хаха",
    "пухля",
    "у тебя жировые складки",
    "чел знаешь ты немного пухлый",
    "чел меньше еды больше воды",
    "еда",
    "пукни пжпжпжпжпж слонис",
    "чел у тебя вес равно рост",
    "жировой контейнер",
    "передаю привет исламу матиеву ашану вот всем спасибо за донат",
    "поезд шатанулся",
    "винда скривилась",
    "зеленые полосы",
    "не повезло",
    "скачай кейт мобайл чтоб повезло",
    "приложение вк ебланы",
    "да сука блять бомж заебал поезд шатать",
    "бомж стоп кран дернул в надежде водицы испить",
    "шишка вячеславовна не ставьте два",
    "поезд в болото слетел",
    "колодец"
], kills = 0

module = {
    values: [
        delay = value.createInteger("Delay", 970, 400, 1200),
        checkforallowflying = value.createBoolean("CheckForAllowFlying", true),
        checkforvoid = value.createBoolean("CheckForVoid", true),
        killscounter = value.createBoolean("KillsCounter", false),
        autol = value.createBoolean("AutoL", true),
        autoleave = value.createBoolean("AutoLeave", true),
        removeinvisibility = value.createBoolean("RemoveInvisibility", true),
        fastladder = value.createBoolean("FastLadder", true),
        fastladderspeed = value.createInteger("FastLadderSpeed", 2, 2, 10),
        onehit = value.createBoolean("OneHit", true)
    ],
    onAttack: function(e) {
        onehit.get() && (mc.thePlayer.onGround = false)
    },
    onTick: function(e) {    
    setFlagMethod = Entity.class.getDeclaredMethod("func_70052_a", java.lang.Integer.TYPE, java.lang.Boolean.TYPE)
    setFlagMethod.setAccessible(true)
        mc.thePlayer && mc.theWorld && removeinvisibility.get() && mc.thePlayer.isInvisible() && setFlagMethod.invoke(mc.thePlayer, 5, false) && mc.thePlayer.removePotionEffect(MobEffects.INVISIBILITY) && mc.thePlayer.setVisible(true);
    },
    onUpdate: function() {
        fastladder.get() && mc.thePlayer && mc.thePlayer.isOnLadder() && !mc.gameSettings.keyBindSneak.isKeyDown() && (MovementUtils.isMoving() || mc.gameSettings.keyBindJump.isKeyDown()) && mc.thePlayer.ticksExisted % fastladderspeed.get() == 0 && mc.thePlayer.setPositionAndUpdate(mc.thePlayer.posX, mc.thePlayer.posY + 0.7, mc.thePlayer.posZ);
        fastladder.get() && mc.thePlayer && mc.thePlayer.isOnLadder() && mc.gameSettings.keyBindSneak.isKeyDown() && mc.thePlayer.ticksExisted % fastladderspeed.get() == 0 && mc.thePlayer.setPositionAndUpdate(mc.thePlayer.posX, mc.thePlayer.posY - 0.7, mc.thePlayer.posZ);
        mc.thePlayer && mc.thePlayer.getHealth() == 0 && mc.thePlayer.sendChatMessage("/sw leave")
    },
    onPacket: function(e) {
        mc.thePlayer && ((checkforallowflying.get() && !mc.thePlayer.capabilities.allowFlying) || (checkforvoid.get() && !mc.thePlayer.posY && mc.thePlayer.fallDistance)) && e.packet instanceof SPacketChat && (e.packet.getChatComponent().getUnformattedText().contains("[SkyWars] Игра начинается через 1 секунд!")) && timeout(delay.get(), function() mc.thePlayer.sendChatMessage("/sw leave"));
        mc.thePlayer && autol.get() && e.packet instanceof SPacketChat && e.packet.getChatComponent().getUnformattedText().contains("[SkyWars] Вы убили ") && mc.thePlayer.sendChatMessage(autols[RandomUtils.nextInt(0, autols.length)]) && kills++;
        mc.thePlayer && autoleave.get() && e.packet instanceof SPacketChat && (e.packet.getChatComponent().getUnformattedText().contains("[SkyWars] Поздравляю! Вы выиграли игру!") || e.packet.getChatComponent().getUnformattedText().contains(mc.thePlayer.getName() + " победил в игре!")) && mc.thePlayer.sendChatMessage("/sw leave");
        mc.thePlayer && onehit.get() && e.packet instanceof CPacketPlayer && (e.packet.onGround = false) && (e.packet.y += mc.thePlayer.ticksExisted % 2 == 0 ? 0.0000042 + RandomUtils.INSTANCE.nextFloat(-0.000002103, 0.00001772) : 0.0155 + RandomUtils.INSTANCE.nextFloat(-0.00931, 0.00561))
    },
    onWorld: function(e) {
        kills = 0
    },
    onRender2D: function() {
        killscounter.get() && kills && mc.ingameGUI.drawCenteredString(mc.fontRenderer, "\u00a78[\u00a75SkyWars: \u00a7dKills: " + kills + "\u00a78]", mc.displayWidth / 4, mc.displayHeight / 2.5, -1)
    }
}

