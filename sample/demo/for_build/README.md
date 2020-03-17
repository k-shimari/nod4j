# calcmax
	@Test
	public void testcalcmin() {
		assertEquals(MIN, Main.calcmin(MID, MIN, MAX));
		assertEquals(MIN, Main.calcmin(MID, MAX, MIN));
		assertEquals(MIN, Main.calcmin(MAX, MIN, MID));
		assertEquals(MIN, Main.calcmin(MAX, MID, MIN));
		assertEquals(MIN, Main.calcmin(MIN, MID, MAX));
		assertEquals(MIN, Main.calcmin(MIN, MAX, MID));
	}

	@Test
	public void testcalcmedian() {
		assertEquals(MID, Main.calcmedian(MID, MIN, MAX));
		assertEquals(MID, Main.calcmedian(MID, MAX, MIN));
		assertEquals(MID, Main.calcmedian(MAX, MIN, MID));
		assertEquals(MID, Main.calcmedian(MAX, MID, MIN));
		assertEquals(MID, Main.calcmedian(MIN, MID, MAX));
		assertEquals(MID, Main.calcmedian(MIN, MAX, MID));
	}

	/*
	public static int calcmin(int num1, int num2, int num3) {
		int min;
		if (num1 < num2) {
			if (num1 < num3) {
				return num1;
			} else {
				return num3;
			}
		} else {
			if (num2 < num3) {
				return num2;
			} else {
				return num3;
			}
		}
	}

	public static int calcmedian(int num1, int num2, int num3) {
		int median = 0;
		if (num1 < num2) {
			if (num2 < num3) {
				median = num2;
			} else if (num1 < num3) {
				median = num3;
			} else {
				median = num1;
			}
		} else {
			if (num1 < num3) {
				median = num1;
			} else if (num2 < num3) {
				median = num3;
			} else {
				median = num2;
			}
		}
		return median;
	}
	*/