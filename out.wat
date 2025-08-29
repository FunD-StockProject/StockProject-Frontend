(module
  (type (;0;) (func (result i32)))
  (type (;1;) (func (param i32) (result i32)))
  (type (;2;) (func))
  (type (;3;) (func (param i32)))
  (type (;4;) (func (param i32 i32)))
  (type (;5;) (func (param i32 i32 i32) (result i32)))
  (type (;6;) (func (param i32 i32) (result i32)))
  (func (;0;) (type 2)
    call 10)
  (func (;1;) (type 4) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    local.set 2
    i32.const 16
    local.set 3
    local.get 2
    local.get 3
    i32.sub
    local.set 4
    local.get 4
    global.set 0
    local.get 4
    local.get 0
    i32.store offset=12
    local.get 4
    local.get 1
    i32.store offset=8
    local.get 4
    i32.load offset=12
    local.set 5
    i32.const 0
    local.set 6
    local.get 6
    local.get 5
    i32.store offset=67768
    local.get 4
    i32.load offset=8
    local.set 7
    i32.const 0
    local.set 8
    local.get 8
    local.get 7
    i32.store offset=67772
    i32.const 0
    local.set 9
    local.get 9
    i32.load offset=67768
    local.set 10
    i32.const 1
    local.set 11
    local.get 10
    local.get 11
    i32.add
    local.set 12
    i32.const 0
    local.set 13
    local.get 13
    local.get 12
    i32.store offset=67776
    i32.const 0
    local.set 14
    local.get 14
    i32.load offset=67772
    local.set 15
    i32.const 1
    local.set 16
    local.get 15
    local.get 16
    i32.add
    local.set 17
    i32.const 0
    local.set 18
    local.get 18
    local.get 17
    i32.store offset=67780
    i32.const 0
    local.set 19
    local.get 19
    i32.load offset=67776
    local.set 20
    i32.const 2
    local.set 21
    local.get 20
    local.get 21
    i32.shl
    local.set 22
    i32.const 0
    local.set 23
    local.get 23
    i32.load offset=67780
    local.set 24
    local.get 22
    local.get 24
    i32.mul
    local.set 25
    local.get 25
    call 4
    local.set 26
    i32.const 0
    local.set 27
    local.get 27
    local.get 26
    i32.store offset=67784
    i32.const 0
    local.set 28
    local.get 28
    i32.load offset=67768
    local.set 29
    i32.const 0
    local.set 30
    local.get 29
    local.get 30
    i32.shl
    local.set 31
    i32.const 0
    local.set 32
    local.get 32
    i32.load offset=67772
    local.set 33
    local.get 31
    local.get 33
    i32.mul
    local.set 34
    local.get 34
    call 4
    local.set 35
    i32.const 0
    local.set 36
    local.get 36
    local.get 35
    i32.store offset=67788
    i32.const 0
    local.set 37
    local.get 37
    i32.load offset=67768
    local.set 38
    i32.const 2
    local.set 39
    local.get 38
    local.get 39
    i32.shl
    local.set 40
    i32.const 0
    local.set 41
    local.get 41
    i32.load offset=67772
    local.set 42
    local.get 40
    local.get 42
    i32.mul
    local.set 43
    local.get 43
    call 4
    local.set 44
    i32.const 0
    local.set 45
    local.get 45
    local.get 44
    i32.store offset=67792
    i32.const 16
    local.set 46
    local.get 4
    local.get 46
    i32.add
    local.set 47
    local.get 47
    global.set 0
    return)
  (func (;2;) (type 2)
    block  ;; label = @1
      i32.const 1
      i32.eqz
      br_if 0 (;@1;)
      call 0
    end)
  (func (;3;) (type 0) (result i32)
    i32.const 67796)
  (func (;4;) (type 1) (param i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32 i32 i32 i32)
    global.get 0
    i32.const 16
    i32.sub
    local.tee 1
    global.set 0
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        block  ;; label = @11
                          local.get 0
                          i32.const 244
                          i32.gt_u
                          br_if 0 (;@11;)
                          block  ;; label = @12
                            i32.const 0
                            i32.load offset=67800
                            local.tee 2
                            i32.const 16
                            local.get 0
                            i32.const 11
                            i32.add
                            i32.const 504
                            i32.and
                            local.get 0
                            i32.const 11
                            i32.lt_u
                            select
                            local.tee 3
                            i32.const 3
                            i32.shr_u
                            local.tee 4
                            i32.shr_u
                            local.tee 0
                            i32.const 3
                            i32.and
                            i32.eqz
                            br_if 0 (;@12;)
                            block  ;; label = @13
                              block  ;; label = @14
                                local.get 0
                                i32.const -1
                                i32.xor
                                i32.const 1
                                i32.and
                                local.get 4
                                i32.add
                                local.tee 3
                                i32.const 3
                                i32.shl
                                local.tee 4
                                i32.const 67840
                                i32.add
                                local.tee 0
                                local.get 4
                                i32.const 67848
                                i32.add
                                i32.load
                                local.tee 4
                                i32.load offset=8
                                local.tee 5
                                i32.ne
                                br_if 0 (;@14;)
                                i32.const 0
                                local.get 2
                                i32.const -2
                                local.get 3
                                i32.rotl
                                i32.and
                                i32.store offset=67800
                                br 1 (;@13;)
                              end
                              local.get 5
                              local.get 0
                              i32.store offset=12
                              local.get 0
                              local.get 5
                              i32.store offset=8
                            end
                            local.get 4
                            i32.const 8
                            i32.add
                            local.set 0
                            local.get 4
                            local.get 3
                            i32.const 3
                            i32.shl
                            local.tee 3
                            i32.const 3
                            i32.or
                            i32.store offset=4
                            local.get 4
                            local.get 3
                            i32.add
                            local.tee 4
                            local.get 4
                            i32.load offset=4
                            i32.const 1
                            i32.or
                            i32.store offset=4
                            br 11 (;@1;)
                          end
                          local.get 3
                          i32.const 0
                          i32.load offset=67808
                          local.tee 6
                          i32.le_u
                          br_if 1 (;@10;)
                          block  ;; label = @12
                            local.get 0
                            i32.eqz
                            br_if 0 (;@12;)
                            block  ;; label = @13
                              block  ;; label = @14
                                local.get 0
                                local.get 4
                                i32.shl
                                i32.const 2
                                local.get 4
                                i32.shl
                                local.tee 0
                                i32.const 0
                                local.get 0
                                i32.sub
                                i32.or
                                i32.and
                                i32.ctz
                                local.tee 4
                                i32.const 3
                                i32.shl
                                local.tee 0
                                i32.const 67840
                                i32.add
                                local.tee 5
                                local.get 0
                                i32.const 67848
                                i32.add
                                i32.load
                                local.tee 0
                                i32.load offset=8
                                local.tee 7
                                i32.ne
                                br_if 0 (;@14;)
                                i32.const 0
                                local.get 2
                                i32.const -2
                                local.get 4
                                i32.rotl
                                i32.and
                                local.tee 2
                                i32.store offset=67800
                                br 1 (;@13;)
                              end
                              local.get 7
                              local.get 5
                              i32.store offset=12
                              local.get 5
                              local.get 7
                              i32.store offset=8
                            end
                            local.get 0
                            local.get 3
                            i32.const 3
                            i32.or
                            i32.store offset=4
                            local.get 0
                            local.get 3
                            i32.add
                            local.tee 7
                            local.get 4
                            i32.const 3
                            i32.shl
                            local.tee 4
                            local.get 3
                            i32.sub
                            local.tee 3
                            i32.const 1
                            i32.or
                            i32.store offset=4
                            local.get 0
                            local.get 4
                            i32.add
                            local.get 3
                            i32.store
                            block  ;; label = @13
                              local.get 6
                              i32.eqz
                              br_if 0 (;@13;)
                              local.get 6
                              i32.const -8
                              i32.and
                              i32.const 67840
                              i32.add
                              local.set 5
                              i32.const 0
                              i32.load offset=67820
                              local.set 4
                              block  ;; label = @14
                                block  ;; label = @15
                                  local.get 2
                                  i32.const 1
                                  local.get 6
                                  i32.const 3
                                  i32.shr_u
                                  i32.shl
                                  local.tee 8
                                  i32.and
                                  br_if 0 (;@15;)
                                  i32.const 0
                                  local.get 2
                                  local.get 8
                                  i32.or
                                  i32.store offset=67800
                                  local.get 5
                                  local.set 8
                                  br 1 (;@14;)
                                end
                                local.get 5
                                i32.load offset=8
                                local.set 8
                              end
                              local.get 5
                              local.get 4
                              i32.store offset=8
                              local.get 8
                              local.get 4
                              i32.store offset=12
                              local.get 4
                              local.get 5
                              i32.store offset=12
                              local.get 4
                              local.get 8
                              i32.store offset=8
                            end
                            local.get 0
                            i32.const 8
                            i32.add
                            local.set 0
                            i32.const 0
                            local.get 7
                            i32.store offset=67820
                            i32.const 0
                            local.get 3
                            i32.store offset=67808
                            br 11 (;@1;)
                          end
                          i32.const 0
                          i32.load offset=67804
                          local.tee 9
                          i32.eqz
                          br_if 1 (;@10;)
                          local.get 9
                          i32.ctz
                          i32.const 2
                          i32.shl
                          i32.const 68104
                          i32.add
                          i32.load
                          local.tee 7
                          i32.load offset=4
                          i32.const -8
                          i32.and
                          local.get 3
                          i32.sub
                          local.set 4
                          local.get 7
                          local.set 5
                          block  ;; label = @12
                            loop  ;; label = @13
                              block  ;; label = @14
                                local.get 5
                                i32.load offset=16
                                local.tee 0
                                br_if 0 (;@14;)
                                local.get 5
                                i32.load offset=20
                                local.tee 0
                                i32.eqz
                                br_if 2 (;@12;)
                              end
                              local.get 0
                              i32.load offset=4
                              i32.const -8
                              i32.and
                              local.get 3
                              i32.sub
                              local.tee 5
                              local.get 4
                              local.get 5
                              local.get 4
                              i32.lt_u
                              local.tee 5
                              select
                              local.set 4
                              local.get 0
                              local.get 7
                              local.get 5
                              select
                              local.set 7
                              local.get 0
                              local.set 5
                              br 0 (;@13;)
                            end
                            unreachable
                          end
                          local.get 7
                          i32.load offset=24
                          local.set 10
                          block  ;; label = @12
                            local.get 7
                            i32.load offset=12
                            local.tee 0
                            local.get 7
                            i32.eq
                            br_if 0 (;@12;)
                            local.get 7
                            i32.load offset=8
                            local.tee 5
                            local.get 0
                            i32.store offset=12
                            local.get 0
                            local.get 5
                            i32.store offset=8
                            br 10 (;@2;)
                          end
                          block  ;; label = @12
                            block  ;; label = @13
                              local.get 7
                              i32.load offset=20
                              local.tee 5
                              i32.eqz
                              br_if 0 (;@13;)
                              local.get 7
                              i32.const 20
                              i32.add
                              local.set 8
                              br 1 (;@12;)
                            end
                            local.get 7
                            i32.load offset=16
                            local.tee 5
                            i32.eqz
                            br_if 3 (;@9;)
                            local.get 7
                            i32.const 16
                            i32.add
                            local.set 8
                          end
                          loop  ;; label = @12
                            local.get 8
                            local.set 11
                            local.get 5
                            local.tee 0
                            i32.const 20
                            i32.add
                            local.set 8
                            local.get 0
                            i32.load offset=20
                            local.tee 5
                            br_if 0 (;@12;)
                            local.get 0
                            i32.const 16
                            i32.add
                            local.set 8
                            local.get 0
                            i32.load offset=16
                            local.tee 5
                            br_if 0 (;@12;)
                          end
                          local.get 11
                          i32.const 0
                          i32.store
                          br 9 (;@2;)
                        end
                        i32.const -1
                        local.set 3
                        local.get 0
                        i32.const -65
                        i32.gt_u
                        br_if 0 (;@10;)
                        local.get 0
                        i32.const 11
                        i32.add
                        local.tee 4
                        i32.const -8
                        i32.and
                        local.set 3
                        i32.const 0
                        i32.load offset=67804
                        local.tee 10
                        i32.eqz
                        br_if 0 (;@10;)
                        i32.const 31
                        local.set 6
                        block  ;; label = @11
                          local.get 0
                          i32.const 16777204
                          i32.gt_u
                          br_if 0 (;@11;)
                          local.get 3
                          i32.const 38
                          local.get 4
                          i32.const 8
                          i32.shr_u
                          i32.clz
                          local.tee 0
                          i32.sub
                          i32.shr_u
                          i32.const 1
                          i32.and
                          local.get 0
                          i32.const 1
                          i32.shl
                          i32.sub
                          i32.const 62
                          i32.add
                          local.set 6
                        end
                        i32.const 0
                        local.get 3
                        i32.sub
                        local.set 4
                        block  ;; label = @11
                          block  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                local.get 6
                                i32.const 2
                                i32.shl
                                i32.const 68104
                                i32.add
                                i32.load
                                local.tee 5
                                br_if 0 (;@14;)
                                i32.const 0
                                local.set 0
                                i32.const 0
                                local.set 8
                                br 1 (;@13;)
                              end
                              i32.const 0
                              local.set 0
                              local.get 3
                              i32.const 0
                              i32.const 25
                              local.get 6
                              i32.const 1
                              i32.shr_u
                              i32.sub
                              local.get 6
                              i32.const 31
                              i32.eq
                              select
                              i32.shl
                              local.set 7
                              i32.const 0
                              local.set 8
                              loop  ;; label = @14
                                block  ;; label = @15
                                  local.get 5
                                  i32.load offset=4
                                  i32.const -8
                                  i32.and
                                  local.get 3
                                  i32.sub
                                  local.tee 2
                                  local.get 4
                                  i32.ge_u
                                  br_if 0 (;@15;)
                                  local.get 2
                                  local.set 4
                                  local.get 5
                                  local.set 8
                                  local.get 2
                                  br_if 0 (;@15;)
                                  i32.const 0
                                  local.set 4
                                  local.get 5
                                  local.set 8
                                  local.get 5
                                  local.set 0
                                  br 3 (;@12;)
                                end
                                local.get 0
                                local.get 5
                                i32.load offset=20
                                local.tee 2
                                local.get 2
                                local.get 5
                                local.get 7
                                i32.const 29
                                i32.shr_u
                                i32.const 4
                                i32.and
                                i32.add
                                i32.load offset=16
                                local.tee 11
                                i32.eq
                                select
                                local.get 0
                                local.get 2
                                select
                                local.set 0
                                local.get 7
                                i32.const 1
                                i32.shl
                                local.set 7
                                local.get 11
                                local.set 5
                                local.get 11
                                br_if 0 (;@14;)
                              end
                            end
                            block  ;; label = @13
                              local.get 0
                              local.get 8
                              i32.or
                              br_if 0 (;@13;)
                              i32.const 0
                              local.set 8
                              i32.const 2
                              local.get 6
                              i32.shl
                              local.tee 0
                              i32.const 0
                              local.get 0
                              i32.sub
                              i32.or
                              local.get 10
                              i32.and
                              local.tee 0
                              i32.eqz
                              br_if 3 (;@10;)
                              local.get 0
                              i32.ctz
                              i32.const 2
                              i32.shl
                              i32.const 68104
                              i32.add
                              i32.load
                              local.set 0
                            end
                            local.get 0
                            i32.eqz
                            br_if 1 (;@11;)
                          end
                          loop  ;; label = @12
                            local.get 0
                            i32.load offset=4
                            i32.const -8
                            i32.and
                            local.get 3
                            i32.sub
                            local.tee 2
                            local.get 4
                            i32.lt_u
                            local.set 7
                            block  ;; label = @13
                              local.get 0
                              i32.load offset=16
                              local.tee 5
                              br_if 0 (;@13;)
                              local.get 0
                              i32.load offset=20
                              local.set 5
                            end
                            local.get 2
                            local.get 4
                            local.get 7
                            select
                            local.set 4
                            local.get 0
                            local.get 8
                            local.get 7
                            select
                            local.set 8
                            local.get 5
                            local.set 0
                            local.get 5
                            br_if 0 (;@12;)
                          end
                        end
                        local.get 8
                        i32.eqz
                        br_if 0 (;@10;)
                        local.get 4
                        i32.const 0
                        i32.load offset=67808
                        local.get 3
                        i32.sub
                        i32.ge_u
                        br_if 0 (;@10;)
                        local.get 8
                        i32.load offset=24
                        local.set 11
                        block  ;; label = @11
                          local.get 8
                          i32.load offset=12
                          local.tee 0
                          local.get 8
                          i32.eq
                          br_if 0 (;@11;)
                          local.get 8
                          i32.load offset=8
                          local.tee 5
                          local.get 0
                          i32.store offset=12
                          local.get 0
                          local.get 5
                          i32.store offset=8
                          br 8 (;@3;)
                        end
                        block  ;; label = @11
                          block  ;; label = @12
                            local.get 8
                            i32.load offset=20
                            local.tee 5
                            i32.eqz
                            br_if 0 (;@12;)
                            local.get 8
                            i32.const 20
                            i32.add
                            local.set 7
                            br 1 (;@11;)
                          end
                          local.get 8
                          i32.load offset=16
                          local.tee 5
                          i32.eqz
                          br_if 3 (;@8;)
                          local.get 8
                          i32.const 16
                          i32.add
                          local.set 7
                        end
                        loop  ;; label = @11
                          local.get 7
                          local.set 2
                          local.get 5
                          local.tee 0
                          i32.const 20
                          i32.add
                          local.set 7
                          local.get 0
                          i32.load offset=20
                          local.tee 5
                          br_if 0 (;@11;)
                          local.get 0
                          i32.const 16
                          i32.add
                          local.set 7
                          local.get 0
                          i32.load offset=16
                          local.tee 5
                          br_if 0 (;@11;)
                        end
                        local.get 2
                        i32.const 0
                        i32.store
                        br 7 (;@3;)
                      end
                      block  ;; label = @10
                        i32.const 0
                        i32.load offset=67808
                        local.tee 0
                        local.get 3
                        i32.lt_u
                        br_if 0 (;@10;)
                        i32.const 0
                        i32.load offset=67820
                        local.set 4
                        block  ;; label = @11
                          block  ;; label = @12
                            local.get 0
                            local.get 3
                            i32.sub
                            local.tee 5
                            i32.const 16
                            i32.lt_u
                            br_if 0 (;@12;)
                            local.get 4
                            local.get 3
                            i32.add
                            local.tee 7
                            local.get 5
                            i32.const 1
                            i32.or
                            i32.store offset=4
                            local.get 4
                            local.get 0
                            i32.add
                            local.get 5
                            i32.store
                            local.get 4
                            local.get 3
                            i32.const 3
                            i32.or
                            i32.store offset=4
                            br 1 (;@11;)
                          end
                          local.get 4
                          local.get 0
                          i32.const 3
                          i32.or
                          i32.store offset=4
                          local.get 4
                          local.get 0
                          i32.add
                          local.tee 0
                          local.get 0
                          i32.load offset=4
                          i32.const 1
                          i32.or
                          i32.store offset=4
                          i32.const 0
                          local.set 7
                          i32.const 0
                          local.set 5
                        end
                        i32.const 0
                        local.get 5
                        i32.store offset=67808
                        i32.const 0
                        local.get 7
                        i32.store offset=67820
                        local.get 4
                        i32.const 8
                        i32.add
                        local.set 0
                        br 9 (;@1;)
                      end
                      block  ;; label = @10
                        i32.const 0
                        i32.load offset=67812
                        local.tee 7
                        local.get 3
                        i32.le_u
                        br_if 0 (;@10;)
                        i32.const 0
                        local.get 7
                        local.get 3
                        i32.sub
                        local.tee 4
                        i32.store offset=67812
                        i32.const 0
                        i32.const 0
                        i32.load offset=67824
                        local.tee 0
                        local.get 3
                        i32.add
                        local.tee 5
                        i32.store offset=67824
                        local.get 5
                        local.get 4
                        i32.const 1
                        i32.or
                        i32.store offset=4
                        local.get 0
                        local.get 3
                        i32.const 3
                        i32.or
                        i32.store offset=4
                        local.get 0
                        i32.const 8
                        i32.add
                        local.set 0
                        br 9 (;@1;)
                      end
                      block  ;; label = @10
                        block  ;; label = @11
                          i32.const 0
                          i32.load offset=68272
                          i32.eqz
                          br_if 0 (;@11;)
                          i32.const 0
                          i32.load offset=68280
                          local.set 4
                          br 1 (;@10;)
                        end
                        i32.const 0
                        i64.const -1
                        i64.store offset=68284 align=4
                        i32.const 0
                        i64.const 17592186048512
                        i64.store offset=68276 align=4
                        i32.const 0
                        local.get 1
                        i32.const 12
                        i32.add
                        i32.const -16
                        i32.and
                        i32.const 1431655768
                        i32.xor
                        i32.store offset=68272
                        i32.const 0
                        i32.const 0
                        i32.store offset=68292
                        i32.const 0
                        i32.const 0
                        i32.store offset=68244
                        i32.const 4096
                        local.set 4
                      end
                      i32.const 0
                      local.set 0
                      local.get 4
                      local.get 3
                      i32.const 47
                      i32.add
                      local.tee 6
                      i32.add
                      local.tee 2
                      i32.const 0
                      local.get 4
                      i32.sub
                      local.tee 11
                      i32.and
                      local.tee 8
                      local.get 3
                      i32.le_u
                      br_if 8 (;@1;)
                      i32.const 0
                      local.set 0
                      block  ;; label = @10
                        i32.const 0
                        i32.load offset=68240
                        local.tee 4
                        i32.eqz
                        br_if 0 (;@10;)
                        i32.const 0
                        i32.load offset=68232
                        local.tee 5
                        local.get 8
                        i32.add
                        local.tee 10
                        local.get 5
                        i32.le_u
                        br_if 9 (;@1;)
                        local.get 10
                        local.get 4
                        i32.gt_u
                        br_if 9 (;@1;)
                      end
                      block  ;; label = @10
                        block  ;; label = @11
                          i32.const 0
                          i32.load8_u offset=68244
                          i32.const 4
                          i32.and
                          br_if 0 (;@11;)
                          block  ;; label = @12
                            block  ;; label = @13
                              block  ;; label = @14
                                block  ;; label = @15
                                  block  ;; label = @16
                                    i32.const 0
                                    i32.load offset=67824
                                    local.tee 4
                                    i32.eqz
                                    br_if 0 (;@16;)
                                    i32.const 68248
                                    local.set 0
                                    loop  ;; label = @17
                                      block  ;; label = @18
                                        local.get 4
                                        local.get 0
                                        i32.load
                                        local.tee 5
                                        i32.lt_u
                                        br_if 0 (;@18;)
                                        local.get 4
                                        local.get 5
                                        local.get 0
                                        i32.load offset=4
                                        i32.add
                                        i32.lt_u
                                        br_if 3 (;@15;)
                                      end
                                      local.get 0
                                      i32.load offset=8
                                      local.tee 0
                                      br_if 0 (;@17;)
                                    end
                                  end
                                  i32.const 0
                                  call 9
                                  local.tee 7
                                  i32.const -1
                                  i32.eq
                                  br_if 3 (;@12;)
                                  local.get 8
                                  local.set 2
                                  block  ;; label = @16
                                    i32.const 0
                                    i32.load offset=68276
                                    local.tee 0
                                    i32.const -1
                                    i32.add
                                    local.tee 4
                                    local.get 7
                                    i32.and
                                    i32.eqz
                                    br_if 0 (;@16;)
                                    local.get 8
                                    local.get 7
                                    i32.sub
                                    local.get 4
                                    local.get 7
                                    i32.add
                                    i32.const 0
                                    local.get 0
                                    i32.sub
                                    i32.and
                                    i32.add
                                    local.set 2
                                  end
                                  local.get 2
                                  local.get 3
                                  i32.le_u
                                  br_if 3 (;@12;)
                                  block  ;; label = @16
                                    i32.const 0
                                    i32.load offset=68240
                                    local.tee 0
                                    i32.eqz
                                    br_if 0 (;@16;)
                                    i32.const 0
                                    i32.load offset=68232
                                    local.tee 4
                                    local.get 2
                                    i32.add
                                    local.tee 5
                                    local.get 4
                                    i32.le_u
                                    br_if 4 (;@12;)
                                    local.get 5
                                    local.get 0
                                    i32.gt_u
                                    br_if 4 (;@12;)
                                  end
                                  local.get 2
                                  call 9
                                  local.tee 0
                                  local.get 7
                                  i32.ne
                                  br_if 1 (;@14;)
                                  br 5 (;@10;)
                                end
                                local.get 2
                                local.get 7
                                i32.sub
                                local.get 11
                                i32.and
                                local.tee 2
                                call 9
                                local.tee 7
                                local.get 0
                                i32.load
                                local.get 0
                                i32.load offset=4
                                i32.add
                                i32.eq
                                br_if 1 (;@13;)
                                local.get 7
                                local.set 0
                              end
                              local.get 0
                              i32.const -1
                              i32.eq
                              br_if 1 (;@12;)
                              block  ;; label = @14
                                local.get 2
                                local.get 3
                                i32.const 48
                                i32.add
                                i32.lt_u
                                br_if 0 (;@14;)
                                local.get 0
                                local.set 7
                                br 4 (;@10;)
                              end
                              local.get 6
                              local.get 2
                              i32.sub
                              i32.const 0
                              i32.load offset=68280
                              local.tee 4
                              i32.add
                              i32.const 0
                              local.get 4
                              i32.sub
                              i32.and
                              local.tee 4
                              call 9
                              i32.const -1
                              i32.eq
                              br_if 1 (;@12;)
                              local.get 4
                              local.get 2
                              i32.add
                              local.set 2
                              local.get 0
                              local.set 7
                              br 3 (;@10;)
                            end
                            local.get 7
                            i32.const -1
                            i32.ne
                            br_if 2 (;@10;)
                          end
                          i32.const 0
                          i32.const 0
                          i32.load offset=68244
                          i32.const 4
                          i32.or
                          i32.store offset=68244
                        end
                        local.get 8
                        call 9
                        local.set 7
                        i32.const 0
                        call 9
                        local.set 0
                        local.get 7
                        i32.const -1
                        i32.eq
                        br_if 5 (;@5;)
                        local.get 0
                        i32.const -1
                        i32.eq
                        br_if 5 (;@5;)
                        local.get 7
                        local.get 0
                        i32.ge_u
                        br_if 5 (;@5;)
                        local.get 0
                        local.get 7
                        i32.sub
                        local.tee 2
                        local.get 3
                        i32.const 40
                        i32.add
                        i32.le_u
                        br_if 5 (;@5;)
                      end
                      i32.const 0
                      i32.const 0
                      i32.load offset=68232
                      local.get 2
                      i32.add
                      local.tee 0
                      i32.store offset=68232
                      block  ;; label = @10
                        local.get 0
                        i32.const 0
                        i32.load offset=68236
                        i32.le_u
                        br_if 0 (;@10;)
                        i32.const 0
                        local.get 0
                        i32.store offset=68236
                      end
                      block  ;; label = @10
                        block  ;; label = @11
                          i32.const 0
                          i32.load offset=67824
                          local.tee 4
                          i32.eqz
                          br_if 0 (;@11;)
                          i32.const 68248
                          local.set 0
                          loop  ;; label = @12
                            local.get 7
                            local.get 0
                            i32.load
                            local.tee 5
                            local.get 0
                            i32.load offset=4
                            local.tee 8
                            i32.add
                            i32.eq
                            br_if 2 (;@10;)
                            local.get 0
                            i32.load offset=8
                            local.tee 0
                            br_if 0 (;@12;)
                            br 5 (;@7;)
                          end
                          unreachable
                        end
                        block  ;; label = @11
                          block  ;; label = @12
                            i32.const 0
                            i32.load offset=67816
                            local.tee 0
                            i32.eqz
                            br_if 0 (;@12;)
                            local.get 7
                            local.get 0
                            i32.ge_u
                            br_if 1 (;@11;)
                          end
                          i32.const 0
                          local.get 7
                          i32.store offset=67816
                        end
                        i32.const 0
                        local.set 0
                        i32.const 0
                        local.get 2
                        i32.store offset=68252
                        i32.const 0
                        local.get 7
                        i32.store offset=68248
                        i32.const 0
                        i32.const -1
                        i32.store offset=67832
                        i32.const 0
                        i32.const 0
                        i32.load offset=68272
                        i32.store offset=67836
                        i32.const 0
                        i32.const 0
                        i32.store offset=68260
                        loop  ;; label = @11
                          local.get 0
                          i32.const 3
                          i32.shl
                          local.tee 4
                          i32.const 67848
                          i32.add
                          local.get 4
                          i32.const 67840
                          i32.add
                          local.tee 5
                          i32.store
                          local.get 4
                          i32.const 67852
                          i32.add
                          local.get 5
                          i32.store
                          local.get 0
                          i32.const 1
                          i32.add
                          local.tee 0
                          i32.const 32
                          i32.ne
                          br_if 0 (;@11;)
                        end
                        i32.const 0
                        local.get 2
                        i32.const -40
                        i32.add
                        local.tee 0
                        i32.const -8
                        local.get 7
                        i32.sub
                        i32.const 7
                        i32.and
                        local.tee 4
                        i32.sub
                        local.tee 5
                        i32.store offset=67812
                        i32.const 0
                        local.get 7
                        local.get 4
                        i32.add
                        local.tee 4
                        i32.store offset=67824
                        local.get 4
                        local.get 5
                        i32.const 1
                        i32.or
                        i32.store offset=4
                        local.get 7
                        local.get 0
                        i32.add
                        i32.const 40
                        i32.store offset=4
                        i32.const 0
                        i32.const 0
                        i32.load offset=68288
                        i32.store offset=67828
                        br 4 (;@6;)
                      end
                      local.get 4
                      local.get 7
                      i32.ge_u
                      br_if 2 (;@7;)
                      local.get 4
                      local.get 5
                      i32.lt_u
                      br_if 2 (;@7;)
                      local.get 0
                      i32.load offset=12
                      i32.const 8
                      i32.and
                      br_if 2 (;@7;)
                      local.get 0
                      local.get 8
                      local.get 2
                      i32.add
                      i32.store offset=4
                      i32.const 0
                      local.get 4
                      i32.const -8
                      local.get 4
                      i32.sub
                      i32.const 7
                      i32.and
                      local.tee 0
                      i32.add
                      local.tee 5
                      i32.store offset=67824
                      i32.const 0
                      i32.const 0
                      i32.load offset=67812
                      local.get 2
                      i32.add
                      local.tee 7
                      local.get 0
                      i32.sub
                      local.tee 0
                      i32.store offset=67812
                      local.get 5
                      local.get 0
                      i32.const 1
                      i32.or
                      i32.store offset=4
                      local.get 4
                      local.get 7
                      i32.add
                      i32.const 40
                      i32.store offset=4
                      i32.const 0
                      i32.const 0
                      i32.load offset=68288
                      i32.store offset=67828
                      br 3 (;@6;)
                    end
                    i32.const 0
                    local.set 0
                    br 6 (;@2;)
                  end
                  i32.const 0
                  local.set 0
                  br 4 (;@3;)
                end
                block  ;; label = @7
                  local.get 7
                  i32.const 0
                  i32.load offset=67816
                  i32.ge_u
                  br_if 0 (;@7;)
                  i32.const 0
                  local.get 7
                  i32.store offset=67816
                end
                local.get 7
                local.get 2
                i32.add
                local.set 5
                i32.const 68248
                local.set 0
                block  ;; label = @7
                  block  ;; label = @8
                    loop  ;; label = @9
                      local.get 0
                      i32.load
                      local.tee 8
                      local.get 5
                      i32.eq
                      br_if 1 (;@8;)
                      local.get 0
                      i32.load offset=8
                      local.tee 0
                      br_if 0 (;@9;)
                      br 2 (;@7;)
                    end
                    unreachable
                  end
                  local.get 0
                  i32.load8_u offset=12
                  i32.const 8
                  i32.and
                  i32.eqz
                  br_if 3 (;@4;)
                end
                i32.const 68248
                local.set 0
                block  ;; label = @7
                  loop  ;; label = @8
                    block  ;; label = @9
                      local.get 4
                      local.get 0
                      i32.load
                      local.tee 5
                      i32.lt_u
                      br_if 0 (;@9;)
                      local.get 4
                      local.get 5
                      local.get 0
                      i32.load offset=4
                      i32.add
                      local.tee 5
                      i32.lt_u
                      br_if 2 (;@7;)
                    end
                    local.get 0
                    i32.load offset=8
                    local.set 0
                    br 0 (;@8;)
                  end
                  unreachable
                end
                i32.const 0
                local.get 2
                i32.const -40
                i32.add
                local.tee 0
                i32.const -8
                local.get 7
                i32.sub
                i32.const 7
                i32.and
                local.tee 8
                i32.sub
                local.tee 11
                i32.store offset=67812
                i32.const 0
                local.get 7
                local.get 8
                i32.add
                local.tee 8
                i32.store offset=67824
                local.get 8
                local.get 11
                i32.const 1
                i32.or
                i32.store offset=4
                local.get 7
                local.get 0
                i32.add
                i32.const 40
                i32.store offset=4
                i32.const 0
                i32.const 0
                i32.load offset=68288
                i32.store offset=67828
                local.get 4
                local.get 5
                i32.const 39
                local.get 5
                i32.sub
                i32.const 7
                i32.and
                i32.add
                i32.const -47
                i32.add
                local.tee 0
                local.get 0
                local.get 4
                i32.const 16
                i32.add
                i32.lt_u
                select
                local.tee 8
                i32.const 27
                i32.store offset=4
                local.get 8
                i32.const 16
                i32.add
                i32.const 0
                i64.load offset=68256 align=4
                i64.store align=4
                local.get 8
                i32.const 0
                i64.load offset=68248 align=4
                i64.store offset=8 align=4
                i32.const 0
                local.get 8
                i32.const 8
                i32.add
                i32.store offset=68256
                i32.const 0
                local.get 2
                i32.store offset=68252
                i32.const 0
                local.get 7
                i32.store offset=68248
                i32.const 0
                i32.const 0
                i32.store offset=68260
                local.get 8
                i32.const 24
                i32.add
                local.set 0
                loop  ;; label = @7
                  local.get 0
                  i32.const 7
                  i32.store offset=4
                  local.get 0
                  i32.const 8
                  i32.add
                  local.set 7
                  local.get 0
                  i32.const 4
                  i32.add
                  local.set 0
                  local.get 7
                  local.get 5
                  i32.lt_u
                  br_if 0 (;@7;)
                end
                local.get 8
                local.get 4
                i32.eq
                br_if 0 (;@6;)
                local.get 8
                local.get 8
                i32.load offset=4
                i32.const -2
                i32.and
                i32.store offset=4
                local.get 4
                local.get 8
                local.get 4
                i32.sub
                local.tee 7
                i32.const 1
                i32.or
                i32.store offset=4
                local.get 8
                local.get 7
                i32.store
                block  ;; label = @7
                  block  ;; label = @8
                    local.get 7
                    i32.const 255
                    i32.gt_u
                    br_if 0 (;@8;)
                    local.get 7
                    i32.const -8
                    i32.and
                    i32.const 67840
                    i32.add
                    local.set 0
                    block  ;; label = @9
                      block  ;; label = @10
                        i32.const 0
                        i32.load offset=67800
                        local.tee 5
                        i32.const 1
                        local.get 7
                        i32.const 3
                        i32.shr_u
                        i32.shl
                        local.tee 7
                        i32.and
                        br_if 0 (;@10;)
                        i32.const 0
                        local.get 5
                        local.get 7
                        i32.or
                        i32.store offset=67800
                        local.get 0
                        local.set 5
                        br 1 (;@9;)
                      end
                      local.get 0
                      i32.load offset=8
                      local.set 5
                    end
                    local.get 0
                    local.get 4
                    i32.store offset=8
                    local.get 5
                    local.get 4
                    i32.store offset=12
                    i32.const 12
                    local.set 7
                    i32.const 8
                    local.set 8
                    br 1 (;@7;)
                  end
                  i32.const 31
                  local.set 0
                  block  ;; label = @8
                    local.get 7
                    i32.const 16777215
                    i32.gt_u
                    br_if 0 (;@8;)
                    local.get 7
                    i32.const 38
                    local.get 7
                    i32.const 8
                    i32.shr_u
                    i32.clz
                    local.tee 0
                    i32.sub
                    i32.shr_u
                    i32.const 1
                    i32.and
                    local.get 0
                    i32.const 1
                    i32.shl
                    i32.sub
                    i32.const 62
                    i32.add
                    local.set 0
                  end
                  local.get 4
                  local.get 0
                  i32.store offset=28
                  local.get 4
                  i64.const 0
                  i64.store offset=16 align=4
                  local.get 0
                  i32.const 2
                  i32.shl
                  i32.const 68104
                  i32.add
                  local.set 5
                  block  ;; label = @8
                    block  ;; label = @9
                      block  ;; label = @10
                        i32.const 0
                        i32.load offset=67804
                        local.tee 8
                        i32.const 1
                        local.get 0
                        i32.shl
                        local.tee 2
                        i32.and
                        br_if 0 (;@10;)
                        i32.const 0
                        local.get 8
                        local.get 2
                        i32.or
                        i32.store offset=67804
                        local.get 5
                        local.get 4
                        i32.store
                        local.get 4
                        local.get 5
                        i32.store offset=24
                        br 1 (;@9;)
                      end
                      local.get 7
                      i32.const 0
                      i32.const 25
                      local.get 0
                      i32.const 1
                      i32.shr_u
                      i32.sub
                      local.get 0
                      i32.const 31
                      i32.eq
                      select
                      i32.shl
                      local.set 0
                      local.get 5
                      i32.load
                      local.set 8
                      loop  ;; label = @10
                        local.get 8
                        local.tee 5
                        i32.load offset=4
                        i32.const -8
                        i32.and
                        local.get 7
                        i32.eq
                        br_if 2 (;@8;)
                        local.get 0
                        i32.const 29
                        i32.shr_u
                        local.set 8
                        local.get 0
                        i32.const 1
                        i32.shl
                        local.set 0
                        local.get 5
                        local.get 8
                        i32.const 4
                        i32.and
                        i32.add
                        local.tee 2
                        i32.load offset=16
                        local.tee 8
                        br_if 0 (;@10;)
                      end
                      local.get 2
                      i32.const 16
                      i32.add
                      local.get 4
                      i32.store
                      local.get 4
                      local.get 5
                      i32.store offset=24
                    end
                    i32.const 8
                    local.set 7
                    i32.const 12
                    local.set 8
                    local.get 4
                    local.set 5
                    local.get 4
                    local.set 0
                    br 1 (;@7;)
                  end
                  local.get 5
                  i32.load offset=8
                  local.tee 0
                  local.get 4
                  i32.store offset=12
                  local.get 5
                  local.get 4
                  i32.store offset=8
                  local.get 4
                  local.get 0
                  i32.store offset=8
                  i32.const 0
                  local.set 0
                  i32.const 24
                  local.set 7
                  i32.const 12
                  local.set 8
                end
                local.get 4
                local.get 8
                i32.add
                local.get 5
                i32.store
                local.get 4
                local.get 7
                i32.add
                local.get 0
                i32.store
              end
              i32.const 0
              i32.load offset=67812
              local.tee 0
              local.get 3
              i32.le_u
              br_if 0 (;@5;)
              i32.const 0
              local.get 0
              local.get 3
              i32.sub
              local.tee 4
              i32.store offset=67812
              i32.const 0
              i32.const 0
              i32.load offset=67824
              local.tee 0
              local.get 3
              i32.add
              local.tee 5
              i32.store offset=67824
              local.get 5
              local.get 4
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 0
              local.get 3
              i32.const 3
              i32.or
              i32.store offset=4
              local.get 0
              i32.const 8
              i32.add
              local.set 0
              br 4 (;@1;)
            end
            call 3
            i32.const 48
            i32.store
            i32.const 0
            local.set 0
            br 3 (;@1;)
          end
          local.get 0
          local.get 7
          i32.store
          local.get 0
          local.get 0
          i32.load offset=4
          local.get 2
          i32.add
          i32.store offset=4
          local.get 7
          local.get 8
          local.get 3
          call 5
          local.set 0
          br 2 (;@1;)
        end
        block  ;; label = @3
          local.get 11
          i32.eqz
          br_if 0 (;@3;)
          block  ;; label = @4
            block  ;; label = @5
              local.get 8
              local.get 8
              i32.load offset=28
              local.tee 7
              i32.const 2
              i32.shl
              i32.const 68104
              i32.add
              local.tee 5
              i32.load
              i32.ne
              br_if 0 (;@5;)
              local.get 5
              local.get 0
              i32.store
              local.get 0
              br_if 1 (;@4;)
              i32.const 0
              local.get 10
              i32.const -2
              local.get 7
              i32.rotl
              i32.and
              local.tee 10
              i32.store offset=67804
              br 2 (;@3;)
            end
            block  ;; label = @5
              block  ;; label = @6
                local.get 11
                i32.load offset=16
                local.get 8
                i32.ne
                br_if 0 (;@6;)
                local.get 11
                local.get 0
                i32.store offset=16
                br 1 (;@5;)
              end
              local.get 11
              local.get 0
              i32.store offset=20
            end
            local.get 0
            i32.eqz
            br_if 1 (;@3;)
          end
          local.get 0
          local.get 11
          i32.store offset=24
          block  ;; label = @4
            local.get 8
            i32.load offset=16
            local.tee 5
            i32.eqz
            br_if 0 (;@4;)
            local.get 0
            local.get 5
            i32.store offset=16
            local.get 5
            local.get 0
            i32.store offset=24
          end
          local.get 8
          i32.load offset=20
          local.tee 5
          i32.eqz
          br_if 0 (;@3;)
          local.get 0
          local.get 5
          i32.store offset=20
          local.get 5
          local.get 0
          i32.store offset=24
        end
        block  ;; label = @3
          block  ;; label = @4
            local.get 4
            i32.const 15
            i32.gt_u
            br_if 0 (;@4;)
            local.get 8
            local.get 4
            local.get 3
            i32.add
            local.tee 0
            i32.const 3
            i32.or
            i32.store offset=4
            local.get 8
            local.get 0
            i32.add
            local.tee 0
            local.get 0
            i32.load offset=4
            i32.const 1
            i32.or
            i32.store offset=4
            br 1 (;@3;)
          end
          local.get 8
          local.get 3
          i32.const 3
          i32.or
          i32.store offset=4
          local.get 8
          local.get 3
          i32.add
          local.tee 7
          local.get 4
          i32.const 1
          i32.or
          i32.store offset=4
          local.get 7
          local.get 4
          i32.add
          local.get 4
          i32.store
          block  ;; label = @4
            local.get 4
            i32.const 255
            i32.gt_u
            br_if 0 (;@4;)
            local.get 4
            i32.const -8
            i32.and
            i32.const 67840
            i32.add
            local.set 0
            block  ;; label = @5
              block  ;; label = @6
                i32.const 0
                i32.load offset=67800
                local.tee 3
                i32.const 1
                local.get 4
                i32.const 3
                i32.shr_u
                i32.shl
                local.tee 4
                i32.and
                br_if 0 (;@6;)
                i32.const 0
                local.get 3
                local.get 4
                i32.or
                i32.store offset=67800
                local.get 0
                local.set 4
                br 1 (;@5;)
              end
              local.get 0
              i32.load offset=8
              local.set 4
            end
            local.get 0
            local.get 7
            i32.store offset=8
            local.get 4
            local.get 7
            i32.store offset=12
            local.get 7
            local.get 0
            i32.store offset=12
            local.get 7
            local.get 4
            i32.store offset=8
            br 1 (;@3;)
          end
          i32.const 31
          local.set 0
          block  ;; label = @4
            local.get 4
            i32.const 16777215
            i32.gt_u
            br_if 0 (;@4;)
            local.get 4
            i32.const 38
            local.get 4
            i32.const 8
            i32.shr_u
            i32.clz
            local.tee 0
            i32.sub
            i32.shr_u
            i32.const 1
            i32.and
            local.get 0
            i32.const 1
            i32.shl
            i32.sub
            i32.const 62
            i32.add
            local.set 0
          end
          local.get 7
          local.get 0
          i32.store offset=28
          local.get 7
          i64.const 0
          i64.store offset=16 align=4
          local.get 0
          i32.const 2
          i32.shl
          i32.const 68104
          i32.add
          local.set 3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                local.get 10
                i32.const 1
                local.get 0
                i32.shl
                local.tee 5
                i32.and
                br_if 0 (;@6;)
                i32.const 0
                local.get 10
                local.get 5
                i32.or
                i32.store offset=67804
                local.get 3
                local.get 7
                i32.store
                local.get 7
                local.get 3
                i32.store offset=24
                br 1 (;@5;)
              end
              local.get 4
              i32.const 0
              i32.const 25
              local.get 0
              i32.const 1
              i32.shr_u
              i32.sub
              local.get 0
              i32.const 31
              i32.eq
              select
              i32.shl
              local.set 0
              local.get 3
              i32.load
              local.set 5
              loop  ;; label = @6
                local.get 5
                local.tee 3
                i32.load offset=4
                i32.const -8
                i32.and
                local.get 4
                i32.eq
                br_if 2 (;@4;)
                local.get 0
                i32.const 29
                i32.shr_u
                local.set 5
                local.get 0
                i32.const 1
                i32.shl
                local.set 0
                local.get 3
                local.get 5
                i32.const 4
                i32.and
                i32.add
                local.tee 2
                i32.load offset=16
                local.tee 5
                br_if 0 (;@6;)
              end
              local.get 2
              i32.const 16
              i32.add
              local.get 7
              i32.store
              local.get 7
              local.get 3
              i32.store offset=24
            end
            local.get 7
            local.get 7
            i32.store offset=12
            local.get 7
            local.get 7
            i32.store offset=8
            br 1 (;@3;)
          end
          local.get 3
          i32.load offset=8
          local.tee 0
          local.get 7
          i32.store offset=12
          local.get 3
          local.get 7
          i32.store offset=8
          local.get 7
          i32.const 0
          i32.store offset=24
          local.get 7
          local.get 3
          i32.store offset=12
          local.get 7
          local.get 0
          i32.store offset=8
        end
        local.get 8
        i32.const 8
        i32.add
        local.set 0
        br 1 (;@1;)
      end
      block  ;; label = @2
        local.get 10
        i32.eqz
        br_if 0 (;@2;)
        block  ;; label = @3
          block  ;; label = @4
            local.get 7
            local.get 7
            i32.load offset=28
            local.tee 8
            i32.const 2
            i32.shl
            i32.const 68104
            i32.add
            local.tee 5
            i32.load
            i32.ne
            br_if 0 (;@4;)
            local.get 5
            local.get 0
            i32.store
            local.get 0
            br_if 1 (;@3;)
            i32.const 0
            local.get 9
            i32.const -2
            local.get 8
            i32.rotl
            i32.and
            i32.store offset=67804
            br 2 (;@2;)
          end
          block  ;; label = @4
            block  ;; label = @5
              local.get 10
              i32.load offset=16
              local.get 7
              i32.ne
              br_if 0 (;@5;)
              local.get 10
              local.get 0
              i32.store offset=16
              br 1 (;@4;)
            end
            local.get 10
            local.get 0
            i32.store offset=20
          end
          local.get 0
          i32.eqz
          br_if 1 (;@2;)
        end
        local.get 0
        local.get 10
        i32.store offset=24
        block  ;; label = @3
          local.get 7
          i32.load offset=16
          local.tee 5
          i32.eqz
          br_if 0 (;@3;)
          local.get 0
          local.get 5
          i32.store offset=16
          local.get 5
          local.get 0
          i32.store offset=24
        end
        local.get 7
        i32.load offset=20
        local.tee 5
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        local.get 5
        i32.store offset=20
        local.get 5
        local.get 0
        i32.store offset=24
      end
      block  ;; label = @2
        block  ;; label = @3
          local.get 4
          i32.const 15
          i32.gt_u
          br_if 0 (;@3;)
          local.get 7
          local.get 4
          local.get 3
          i32.add
          local.tee 0
          i32.const 3
          i32.or
          i32.store offset=4
          local.get 7
          local.get 0
          i32.add
          local.tee 0
          local.get 0
          i32.load offset=4
          i32.const 1
          i32.or
          i32.store offset=4
          br 1 (;@2;)
        end
        local.get 7
        local.get 3
        i32.const 3
        i32.or
        i32.store offset=4
        local.get 7
        local.get 3
        i32.add
        local.tee 3
        local.get 4
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 3
        local.get 4
        i32.add
        local.get 4
        i32.store
        block  ;; label = @3
          local.get 6
          i32.eqz
          br_if 0 (;@3;)
          local.get 6
          i32.const -8
          i32.and
          i32.const 67840
          i32.add
          local.set 5
          i32.const 0
          i32.load offset=67820
          local.set 0
          block  ;; label = @4
            block  ;; label = @5
              i32.const 1
              local.get 6
              i32.const 3
              i32.shr_u
              i32.shl
              local.tee 8
              local.get 2
              i32.and
              br_if 0 (;@5;)
              i32.const 0
              local.get 8
              local.get 2
              i32.or
              i32.store offset=67800
              local.get 5
              local.set 8
              br 1 (;@4;)
            end
            local.get 5
            i32.load offset=8
            local.set 8
          end
          local.get 5
          local.get 0
          i32.store offset=8
          local.get 8
          local.get 0
          i32.store offset=12
          local.get 0
          local.get 5
          i32.store offset=12
          local.get 0
          local.get 8
          i32.store offset=8
        end
        i32.const 0
        local.get 3
        i32.store offset=67820
        i32.const 0
        local.get 4
        i32.store offset=67808
      end
      local.get 7
      i32.const 8
      i32.add
      local.set 0
    end
    local.get 1
    i32.const 16
    i32.add
    global.set 0
    local.get 0)
  (func (;5;) (type 5) (param i32 i32 i32) (result i32)
    (local i32 i32 i32 i32 i32 i32 i32)
    local.get 0
    i32.const -8
    local.get 0
    i32.sub
    i32.const 7
    i32.and
    i32.add
    local.tee 3
    local.get 2
    i32.const 3
    i32.or
    i32.store offset=4
    local.get 1
    i32.const -8
    local.get 1
    i32.sub
    i32.const 7
    i32.and
    i32.add
    local.tee 4
    local.get 3
    local.get 2
    i32.add
    local.tee 5
    i32.sub
    local.set 0
    block  ;; label = @1
      block  ;; label = @2
        local.get 4
        i32.const 0
        i32.load offset=67824
        i32.ne
        br_if 0 (;@2;)
        i32.const 0
        local.get 5
        i32.store offset=67824
        i32.const 0
        i32.const 0
        i32.load offset=67812
        local.get 0
        i32.add
        local.tee 2
        i32.store offset=67812
        local.get 5
        local.get 2
        i32.const 1
        i32.or
        i32.store offset=4
        br 1 (;@1;)
      end
      block  ;; label = @2
        local.get 4
        i32.const 0
        i32.load offset=67820
        i32.ne
        br_if 0 (;@2;)
        i32.const 0
        local.get 5
        i32.store offset=67820
        i32.const 0
        i32.const 0
        i32.load offset=67808
        local.get 0
        i32.add
        local.tee 2
        i32.store offset=67808
        local.get 5
        local.get 2
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 5
        local.get 2
        i32.add
        local.get 2
        i32.store
        br 1 (;@1;)
      end
      block  ;; label = @2
        local.get 4
        i32.load offset=4
        local.tee 1
        i32.const 3
        i32.and
        i32.const 1
        i32.ne
        br_if 0 (;@2;)
        local.get 1
        i32.const -8
        i32.and
        local.set 6
        local.get 4
        i32.load offset=12
        local.set 2
        block  ;; label = @3
          block  ;; label = @4
            local.get 1
            i32.const 255
            i32.gt_u
            br_if 0 (;@4;)
            block  ;; label = @5
              local.get 2
              local.get 4
              i32.load offset=8
              local.tee 7
              i32.ne
              br_if 0 (;@5;)
              i32.const 0
              i32.const 0
              i32.load offset=67800
              i32.const -2
              local.get 1
              i32.const 3
              i32.shr_u
              i32.rotl
              i32.and
              i32.store offset=67800
              br 2 (;@3;)
            end
            local.get 7
            local.get 2
            i32.store offset=12
            local.get 2
            local.get 7
            i32.store offset=8
            br 1 (;@3;)
          end
          local.get 4
          i32.load offset=24
          local.set 8
          block  ;; label = @4
            block  ;; label = @5
              local.get 2
              local.get 4
              i32.eq
              br_if 0 (;@5;)
              local.get 4
              i32.load offset=8
              local.tee 1
              local.get 2
              i32.store offset=12
              local.get 2
              local.get 1
              i32.store offset=8
              br 1 (;@4;)
            end
            block  ;; label = @5
              block  ;; label = @6
                block  ;; label = @7
                  local.get 4
                  i32.load offset=20
                  local.tee 1
                  i32.eqz
                  br_if 0 (;@7;)
                  local.get 4
                  i32.const 20
                  i32.add
                  local.set 7
                  br 1 (;@6;)
                end
                local.get 4
                i32.load offset=16
                local.tee 1
                i32.eqz
                br_if 1 (;@5;)
                local.get 4
                i32.const 16
                i32.add
                local.set 7
              end
              loop  ;; label = @6
                local.get 7
                local.set 9
                local.get 1
                local.tee 2
                i32.const 20
                i32.add
                local.set 7
                local.get 2
                i32.load offset=20
                local.tee 1
                br_if 0 (;@6;)
                local.get 2
                i32.const 16
                i32.add
                local.set 7
                local.get 2
                i32.load offset=16
                local.tee 1
                br_if 0 (;@6;)
              end
              local.get 9
              i32.const 0
              i32.store
              br 1 (;@4;)
            end
            i32.const 0
            local.set 2
          end
          local.get 8
          i32.eqz
          br_if 0 (;@3;)
          block  ;; label = @4
            block  ;; label = @5
              local.get 4
              local.get 4
              i32.load offset=28
              local.tee 7
              i32.const 2
              i32.shl
              i32.const 68104
              i32.add
              local.tee 1
              i32.load
              i32.ne
              br_if 0 (;@5;)
              local.get 1
              local.get 2
              i32.store
              local.get 2
              br_if 1 (;@4;)
              i32.const 0
              i32.const 0
              i32.load offset=67804
              i32.const -2
              local.get 7
              i32.rotl
              i32.and
              i32.store offset=67804
              br 2 (;@3;)
            end
            block  ;; label = @5
              block  ;; label = @6
                local.get 8
                i32.load offset=16
                local.get 4
                i32.ne
                br_if 0 (;@6;)
                local.get 8
                local.get 2
                i32.store offset=16
                br 1 (;@5;)
              end
              local.get 8
              local.get 2
              i32.store offset=20
            end
            local.get 2
            i32.eqz
            br_if 1 (;@3;)
          end
          local.get 2
          local.get 8
          i32.store offset=24
          block  ;; label = @4
            local.get 4
            i32.load offset=16
            local.tee 1
            i32.eqz
            br_if 0 (;@4;)
            local.get 2
            local.get 1
            i32.store offset=16
            local.get 1
            local.get 2
            i32.store offset=24
          end
          local.get 4
          i32.load offset=20
          local.tee 1
          i32.eqz
          br_if 0 (;@3;)
          local.get 2
          local.get 1
          i32.store offset=20
          local.get 1
          local.get 2
          i32.store offset=24
        end
        local.get 6
        local.get 0
        i32.add
        local.set 0
        local.get 4
        local.get 6
        i32.add
        local.tee 4
        i32.load offset=4
        local.set 1
      end
      local.get 4
      local.get 1
      i32.const -2
      i32.and
      i32.store offset=4
      local.get 5
      local.get 0
      i32.const 1
      i32.or
      i32.store offset=4
      local.get 5
      local.get 0
      i32.add
      local.get 0
      i32.store
      block  ;; label = @2
        local.get 0
        i32.const 255
        i32.gt_u
        br_if 0 (;@2;)
        local.get 0
        i32.const -8
        i32.and
        i32.const 67840
        i32.add
        local.set 2
        block  ;; label = @3
          block  ;; label = @4
            i32.const 0
            i32.load offset=67800
            local.tee 1
            i32.const 1
            local.get 0
            i32.const 3
            i32.shr_u
            i32.shl
            local.tee 0
            i32.and
            br_if 0 (;@4;)
            i32.const 0
            local.get 1
            local.get 0
            i32.or
            i32.store offset=67800
            local.get 2
            local.set 0
            br 1 (;@3;)
          end
          local.get 2
          i32.load offset=8
          local.set 0
        end
        local.get 2
        local.get 5
        i32.store offset=8
        local.get 0
        local.get 5
        i32.store offset=12
        local.get 5
        local.get 2
        i32.store offset=12
        local.get 5
        local.get 0
        i32.store offset=8
        br 1 (;@1;)
      end
      i32.const 31
      local.set 2
      block  ;; label = @2
        local.get 0
        i32.const 16777215
        i32.gt_u
        br_if 0 (;@2;)
        local.get 0
        i32.const 38
        local.get 0
        i32.const 8
        i32.shr_u
        i32.clz
        local.tee 2
        i32.sub
        i32.shr_u
        i32.const 1
        i32.and
        local.get 2
        i32.const 1
        i32.shl
        i32.sub
        i32.const 62
        i32.add
        local.set 2
      end
      local.get 5
      local.get 2
      i32.store offset=28
      local.get 5
      i64.const 0
      i64.store offset=16 align=4
      local.get 2
      i32.const 2
      i32.shl
      i32.const 68104
      i32.add
      local.set 1
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            i32.const 0
            i32.load offset=67804
            local.tee 7
            i32.const 1
            local.get 2
            i32.shl
            local.tee 4
            i32.and
            br_if 0 (;@4;)
            i32.const 0
            local.get 7
            local.get 4
            i32.or
            i32.store offset=67804
            local.get 1
            local.get 5
            i32.store
            local.get 5
            local.get 1
            i32.store offset=24
            br 1 (;@3;)
          end
          local.get 0
          i32.const 0
          i32.const 25
          local.get 2
          i32.const 1
          i32.shr_u
          i32.sub
          local.get 2
          i32.const 31
          i32.eq
          select
          i32.shl
          local.set 2
          local.get 1
          i32.load
          local.set 7
          loop  ;; label = @4
            local.get 7
            local.tee 1
            i32.load offset=4
            i32.const -8
            i32.and
            local.get 0
            i32.eq
            br_if 2 (;@2;)
            local.get 2
            i32.const 29
            i32.shr_u
            local.set 7
            local.get 2
            i32.const 1
            i32.shl
            local.set 2
            local.get 1
            local.get 7
            i32.const 4
            i32.and
            i32.add
            local.tee 4
            i32.load offset=16
            local.tee 7
            br_if 0 (;@4;)
          end
          local.get 4
          i32.const 16
          i32.add
          local.get 5
          i32.store
          local.get 5
          local.get 1
          i32.store offset=24
        end
        local.get 5
        local.get 5
        i32.store offset=12
        local.get 5
        local.get 5
        i32.store offset=8
        br 1 (;@1;)
      end
      local.get 1
      i32.load offset=8
      local.tee 2
      local.get 5
      i32.store offset=12
      local.get 1
      local.get 5
      i32.store offset=8
      local.get 5
      i32.const 0
      i32.store offset=24
      local.get 5
      local.get 1
      i32.store offset=12
      local.get 5
      local.get 2
      i32.store offset=8
    end
    local.get 3
    i32.const 8
    i32.add)
  (func (;6;) (type 3) (param i32)
    (local i32 i32 i32 i32 i32 i32 i32 i32)
    block  ;; label = @1
      local.get 0
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      i32.const -8
      i32.add
      local.tee 1
      local.get 0
      i32.const -4
      i32.add
      i32.load
      local.tee 2
      i32.const -8
      i32.and
      local.tee 0
      i32.add
      local.set 3
      block  ;; label = @2
        local.get 2
        i32.const 1
        i32.and
        br_if 0 (;@2;)
        local.get 2
        i32.const 2
        i32.and
        i32.eqz
        br_if 1 (;@1;)
        local.get 1
        local.get 1
        i32.load
        local.tee 4
        i32.sub
        local.tee 1
        i32.const 0
        i32.load offset=67816
        i32.lt_u
        br_if 1 (;@1;)
        local.get 4
        local.get 0
        i32.add
        local.set 0
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                local.get 1
                i32.const 0
                i32.load offset=67820
                i32.eq
                br_if 0 (;@6;)
                local.get 1
                i32.load offset=12
                local.set 2
                block  ;; label = @7
                  local.get 4
                  i32.const 255
                  i32.gt_u
                  br_if 0 (;@7;)
                  local.get 2
                  local.get 1
                  i32.load offset=8
                  local.tee 5
                  i32.ne
                  br_if 2 (;@5;)
                  i32.const 0
                  i32.const 0
                  i32.load offset=67800
                  i32.const -2
                  local.get 4
                  i32.const 3
                  i32.shr_u
                  i32.rotl
                  i32.and
                  i32.store offset=67800
                  br 5 (;@2;)
                end
                local.get 1
                i32.load offset=24
                local.set 6
                block  ;; label = @7
                  local.get 2
                  local.get 1
                  i32.eq
                  br_if 0 (;@7;)
                  local.get 1
                  i32.load offset=8
                  local.tee 4
                  local.get 2
                  i32.store offset=12
                  local.get 2
                  local.get 4
                  i32.store offset=8
                  br 4 (;@3;)
                end
                block  ;; label = @7
                  block  ;; label = @8
                    local.get 1
                    i32.load offset=20
                    local.tee 4
                    i32.eqz
                    br_if 0 (;@8;)
                    local.get 1
                    i32.const 20
                    i32.add
                    local.set 5
                    br 1 (;@7;)
                  end
                  local.get 1
                  i32.load offset=16
                  local.tee 4
                  i32.eqz
                  br_if 3 (;@4;)
                  local.get 1
                  i32.const 16
                  i32.add
                  local.set 5
                end
                loop  ;; label = @7
                  local.get 5
                  local.set 7
                  local.get 4
                  local.tee 2
                  i32.const 20
                  i32.add
                  local.set 5
                  local.get 2
                  i32.load offset=20
                  local.tee 4
                  br_if 0 (;@7;)
                  local.get 2
                  i32.const 16
                  i32.add
                  local.set 5
                  local.get 2
                  i32.load offset=16
                  local.tee 4
                  br_if 0 (;@7;)
                end
                local.get 7
                i32.const 0
                i32.store
                br 3 (;@3;)
              end
              local.get 3
              i32.load offset=4
              local.tee 2
              i32.const 3
              i32.and
              i32.const 3
              i32.ne
              br_if 3 (;@2;)
              i32.const 0
              local.get 0
              i32.store offset=67808
              local.get 3
              local.get 2
              i32.const -2
              i32.and
              i32.store offset=4
              local.get 1
              local.get 0
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 3
              local.get 0
              i32.store
              return
            end
            local.get 5
            local.get 2
            i32.store offset=12
            local.get 2
            local.get 5
            i32.store offset=8
            br 2 (;@2;)
          end
          i32.const 0
          local.set 2
        end
        local.get 6
        i32.eqz
        br_if 0 (;@2;)
        block  ;; label = @3
          block  ;; label = @4
            local.get 1
            local.get 1
            i32.load offset=28
            local.tee 5
            i32.const 2
            i32.shl
            i32.const 68104
            i32.add
            local.tee 4
            i32.load
            i32.ne
            br_if 0 (;@4;)
            local.get 4
            local.get 2
            i32.store
            local.get 2
            br_if 1 (;@3;)
            i32.const 0
            i32.const 0
            i32.load offset=67804
            i32.const -2
            local.get 5
            i32.rotl
            i32.and
            i32.store offset=67804
            br 2 (;@2;)
          end
          block  ;; label = @4
            block  ;; label = @5
              local.get 6
              i32.load offset=16
              local.get 1
              i32.ne
              br_if 0 (;@5;)
              local.get 6
              local.get 2
              i32.store offset=16
              br 1 (;@4;)
            end
            local.get 6
            local.get 2
            i32.store offset=20
          end
          local.get 2
          i32.eqz
          br_if 1 (;@2;)
        end
        local.get 2
        local.get 6
        i32.store offset=24
        block  ;; label = @3
          local.get 1
          i32.load offset=16
          local.tee 4
          i32.eqz
          br_if 0 (;@3;)
          local.get 2
          local.get 4
          i32.store offset=16
          local.get 4
          local.get 2
          i32.store offset=24
        end
        local.get 1
        i32.load offset=20
        local.tee 4
        i32.eqz
        br_if 0 (;@2;)
        local.get 2
        local.get 4
        i32.store offset=20
        local.get 4
        local.get 2
        i32.store offset=24
      end
      local.get 1
      local.get 3
      i32.ge_u
      br_if 0 (;@1;)
      local.get 3
      i32.load offset=4
      local.tee 4
      i32.const 1
      i32.and
      i32.eqz
      br_if 0 (;@1;)
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              block  ;; label = @6
                local.get 4
                i32.const 2
                i32.and
                br_if 0 (;@6;)
                block  ;; label = @7
                  local.get 3
                  i32.const 0
                  i32.load offset=67824
                  i32.ne
                  br_if 0 (;@7;)
                  i32.const 0
                  local.get 1
                  i32.store offset=67824
                  i32.const 0
                  i32.const 0
                  i32.load offset=67812
                  local.get 0
                  i32.add
                  local.tee 0
                  i32.store offset=67812
                  local.get 1
                  local.get 0
                  i32.const 1
                  i32.or
                  i32.store offset=4
                  local.get 1
                  i32.const 0
                  i32.load offset=67820
                  i32.ne
                  br_if 6 (;@1;)
                  i32.const 0
                  i32.const 0
                  i32.store offset=67808
                  i32.const 0
                  i32.const 0
                  i32.store offset=67820
                  return
                end
                block  ;; label = @7
                  local.get 3
                  i32.const 0
                  i32.load offset=67820
                  local.tee 6
                  i32.ne
                  br_if 0 (;@7;)
                  i32.const 0
                  local.get 1
                  i32.store offset=67820
                  i32.const 0
                  i32.const 0
                  i32.load offset=67808
                  local.get 0
                  i32.add
                  local.tee 0
                  i32.store offset=67808
                  local.get 1
                  local.get 0
                  i32.const 1
                  i32.or
                  i32.store offset=4
                  local.get 1
                  local.get 0
                  i32.add
                  local.get 0
                  i32.store
                  return
                end
                local.get 4
                i32.const -8
                i32.and
                local.get 0
                i32.add
                local.set 0
                local.get 3
                i32.load offset=12
                local.set 2
                block  ;; label = @7
                  local.get 4
                  i32.const 255
                  i32.gt_u
                  br_if 0 (;@7;)
                  block  ;; label = @8
                    local.get 2
                    local.get 3
                    i32.load offset=8
                    local.tee 5
                    i32.ne
                    br_if 0 (;@8;)
                    i32.const 0
                    i32.const 0
                    i32.load offset=67800
                    i32.const -2
                    local.get 4
                    i32.const 3
                    i32.shr_u
                    i32.rotl
                    i32.and
                    i32.store offset=67800
                    br 5 (;@3;)
                  end
                  local.get 5
                  local.get 2
                  i32.store offset=12
                  local.get 2
                  local.get 5
                  i32.store offset=8
                  br 4 (;@3;)
                end
                local.get 3
                i32.load offset=24
                local.set 8
                block  ;; label = @7
                  local.get 2
                  local.get 3
                  i32.eq
                  br_if 0 (;@7;)
                  local.get 3
                  i32.load offset=8
                  local.tee 4
                  local.get 2
                  i32.store offset=12
                  local.get 2
                  local.get 4
                  i32.store offset=8
                  br 3 (;@4;)
                end
                block  ;; label = @7
                  block  ;; label = @8
                    local.get 3
                    i32.load offset=20
                    local.tee 4
                    i32.eqz
                    br_if 0 (;@8;)
                    local.get 3
                    i32.const 20
                    i32.add
                    local.set 5
                    br 1 (;@7;)
                  end
                  local.get 3
                  i32.load offset=16
                  local.tee 4
                  i32.eqz
                  br_if 2 (;@5;)
                  local.get 3
                  i32.const 16
                  i32.add
                  local.set 5
                end
                loop  ;; label = @7
                  local.get 5
                  local.set 7
                  local.get 4
                  local.tee 2
                  i32.const 20
                  i32.add
                  local.set 5
                  local.get 2
                  i32.load offset=20
                  local.tee 4
                  br_if 0 (;@7;)
                  local.get 2
                  i32.const 16
                  i32.add
                  local.set 5
                  local.get 2
                  i32.load offset=16
                  local.tee 4
                  br_if 0 (;@7;)
                end
                local.get 7
                i32.const 0
                i32.store
                br 2 (;@4;)
              end
              local.get 3
              local.get 4
              i32.const -2
              i32.and
              i32.store offset=4
              local.get 1
              local.get 0
              i32.const 1
              i32.or
              i32.store offset=4
              local.get 1
              local.get 0
              i32.add
              local.get 0
              i32.store
              br 3 (;@2;)
            end
            i32.const 0
            local.set 2
          end
          local.get 8
          i32.eqz
          br_if 0 (;@3;)
          block  ;; label = @4
            block  ;; label = @5
              local.get 3
              local.get 3
              i32.load offset=28
              local.tee 5
              i32.const 2
              i32.shl
              i32.const 68104
              i32.add
              local.tee 4
              i32.load
              i32.ne
              br_if 0 (;@5;)
              local.get 4
              local.get 2
              i32.store
              local.get 2
              br_if 1 (;@4;)
              i32.const 0
              i32.const 0
              i32.load offset=67804
              i32.const -2
              local.get 5
              i32.rotl
              i32.and
              i32.store offset=67804
              br 2 (;@3;)
            end
            block  ;; label = @5
              block  ;; label = @6
                local.get 8
                i32.load offset=16
                local.get 3
                i32.ne
                br_if 0 (;@6;)
                local.get 8
                local.get 2
                i32.store offset=16
                br 1 (;@5;)
              end
              local.get 8
              local.get 2
              i32.store offset=20
            end
            local.get 2
            i32.eqz
            br_if 1 (;@3;)
          end
          local.get 2
          local.get 8
          i32.store offset=24
          block  ;; label = @4
            local.get 3
            i32.load offset=16
            local.tee 4
            i32.eqz
            br_if 0 (;@4;)
            local.get 2
            local.get 4
            i32.store offset=16
            local.get 4
            local.get 2
            i32.store offset=24
          end
          local.get 3
          i32.load offset=20
          local.tee 4
          i32.eqz
          br_if 0 (;@3;)
          local.get 2
          local.get 4
          i32.store offset=20
          local.get 4
          local.get 2
          i32.store offset=24
        end
        local.get 1
        local.get 0
        i32.const 1
        i32.or
        i32.store offset=4
        local.get 1
        local.get 0
        i32.add
        local.get 0
        i32.store
        local.get 1
        local.get 6
        i32.ne
        br_if 0 (;@2;)
        i32.const 0
        local.get 0
        i32.store offset=67808
        return
      end
      block  ;; label = @2
        local.get 0
        i32.const 255
        i32.gt_u
        br_if 0 (;@2;)
        local.get 0
        i32.const -8
        i32.and
        i32.const 67840
        i32.add
        local.set 2
        block  ;; label = @3
          block  ;; label = @4
            i32.const 0
            i32.load offset=67800
            local.tee 4
            i32.const 1
            local.get 0
            i32.const 3
            i32.shr_u
            i32.shl
            local.tee 0
            i32.and
            br_if 0 (;@4;)
            i32.const 0
            local.get 4
            local.get 0
            i32.or
            i32.store offset=67800
            local.get 2
            local.set 0
            br 1 (;@3;)
          end
          local.get 2
          i32.load offset=8
          local.set 0
        end
        local.get 2
        local.get 1
        i32.store offset=8
        local.get 0
        local.get 1
        i32.store offset=12
        local.get 1
        local.get 2
        i32.store offset=12
        local.get 1
        local.get 0
        i32.store offset=8
        return
      end
      i32.const 31
      local.set 2
      block  ;; label = @2
        local.get 0
        i32.const 16777215
        i32.gt_u
        br_if 0 (;@2;)
        local.get 0
        i32.const 38
        local.get 0
        i32.const 8
        i32.shr_u
        i32.clz
        local.tee 2
        i32.sub
        i32.shr_u
        i32.const 1
        i32.and
        local.get 2
        i32.const 1
        i32.shl
        i32.sub
        i32.const 62
        i32.add
        local.set 2
      end
      local.get 1
      local.get 2
      i32.store offset=28
      local.get 1
      i64.const 0
      i64.store offset=16 align=4
      local.get 2
      i32.const 2
      i32.shl
      i32.const 68104
      i32.add
      local.set 5
      block  ;; label = @2
        block  ;; label = @3
          block  ;; label = @4
            block  ;; label = @5
              i32.const 0
              i32.load offset=67804
              local.tee 4
              i32.const 1
              local.get 2
              i32.shl
              local.tee 3
              i32.and
              br_if 0 (;@5;)
              i32.const 0
              local.get 4
              local.get 3
              i32.or
              i32.store offset=67804
              local.get 5
              local.get 1
              i32.store
              i32.const 8
              local.set 0
              i32.const 24
              local.set 2
              br 1 (;@4;)
            end
            local.get 0
            i32.const 0
            i32.const 25
            local.get 2
            i32.const 1
            i32.shr_u
            i32.sub
            local.get 2
            i32.const 31
            i32.eq
            select
            i32.shl
            local.set 2
            local.get 5
            i32.load
            local.set 5
            loop  ;; label = @5
              local.get 5
              local.tee 4
              i32.load offset=4
              i32.const -8
              i32.and
              local.get 0
              i32.eq
              br_if 2 (;@3;)
              local.get 2
              i32.const 29
              i32.shr_u
              local.set 5
              local.get 2
              i32.const 1
              i32.shl
              local.set 2
              local.get 4
              local.get 5
              i32.const 4
              i32.and
              i32.add
              local.tee 3
              i32.load offset=16
              local.tee 5
              br_if 0 (;@5;)
            end
            local.get 3
            i32.const 16
            i32.add
            local.get 1
            i32.store
            i32.const 8
            local.set 0
            i32.const 24
            local.set 2
            local.get 4
            local.set 5
          end
          local.get 1
          local.set 4
          local.get 1
          local.set 3
          br 1 (;@2;)
        end
        local.get 4
        i32.load offset=8
        local.tee 5
        local.get 1
        i32.store offset=12
        local.get 4
        local.get 1
        i32.store offset=8
        i32.const 0
        local.set 3
        i32.const 24
        local.set 0
        i32.const 8
        local.set 2
      end
      local.get 1
      local.get 2
      i32.add
      local.get 5
      i32.store
      local.get 1
      local.get 4
      i32.store offset=12
      local.get 1
      local.get 0
      i32.add
      local.get 3
      i32.store
      i32.const 0
      i32.const 0
      i32.load offset=67832
      i32.const -1
      i32.add
      local.tee 1
      i32.const -1
      local.get 1
      select
      i32.store offset=67832
    end)
  (func (;7;) (type 0) (result i32)
    memory.size
    i32.const 16
    i32.shl)
  (func (;8;) (type 1) (param i32) (result i32)
    i32.const 0)
  (func (;9;) (type 1) (param i32) (result i32)
    (local i32 i32)
    i32.const 0
    i32.load offset=67764
    local.tee 1
    local.get 0
    i32.const 7
    i32.add
    i32.const -8
    i32.and
    local.tee 2
    i32.add
    local.set 0
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          local.get 2
          i32.eqz
          br_if 0 (;@3;)
          local.get 0
          local.get 1
          i32.le_u
          br_if 1 (;@2;)
        end
        local.get 0
        call 7
        i32.le_u
        br_if 1 (;@1;)
        local.get 0
        call 8
        br_if 1 (;@1;)
      end
      call 3
      i32.const 48
      i32.store
      i32.const -1
      return
    end
    i32.const 0
    local.get 0
    i32.store offset=67764
    local.get 1)
  (func (;10;) (type 2)
    i32.const 65536
    global.set 2
    i32.const 0
    i32.const 15
    i32.add
    i32.const -16
    i32.and
    global.set 1)
  (func (;11;) (type 0) (result i32)
    global.get 0
    global.get 1
    i32.sub)
  (func (;12;) (type 0) (result i32)
    global.get 2)
  (func (;13;) (type 0) (result i32)
    global.get 1)
  (func (;14;) (type 3) (param i32)
    local.get 0
    global.set 0)
  (func (;15;) (type 1) (param i32) (result i32)
    (local i32 i32)
    global.get 0
    local.get 0
    i32.sub
    i32.const -16
    i32.and
    local.tee 1
    global.set 0
    local.get 1)
  (func (;16;) (type 0) (result i32)
    global.get 0)
  (func (;17;) (type 6) (param i32 i32) (result i32)
    i32.const 0
    local.get 0
    local.get 0
    i32.const 153
    i32.gt_u
    select
    i32.const 1
    i32.shl
    i32.const 67456
    i32.add
    i32.load16_u
    i32.const 65536
    i32.add)
  (func (;18;) (type 1) (param i32) (result i32)
    local.get 0
    local.get 0
    call 17)
  (table (;0;) 2 2 funcref)
  (memory (;0;) 258 258)
  (global (;0;) (mut i32) (i32.const 65536))
  (global (;1;) (mut i32) (i32.const 0))
  (global (;2;) (mut i32) (i32.const 0))
  (export "memory" (memory 0))
  (export "initSize" (func 1))
  (export "malloc" (func 4))
  (export "__indirect_function_table" (table 0))
  (export "_initialize" (func 2))
  (export "strerror" (func 18))
  (export "free" (func 6))
  (export "emscripten_stack_init" (func 10))
  (export "emscripten_stack_get_free" (func 11))
  (export "emscripten_stack_get_base" (func 12))
  (export "emscripten_stack_get_end" (func 13))
  (export "_emscripten_stack_restore" (func 14))
  (export "_emscripten_stack_alloc" (func 15))
  (export "emscripten_stack_get_current" (func 16))
  (elem (;0;) (i32.const 1) func 0)
  (data (;0;) (i32.const 65536) "No error information\00Illegal byte sequence\00Domain error\00Result not representable\00Not a tty\00Permission denied\00Operation not permitted\00No such file or directory\00No such process\00File exists\00Value too large for data type\00No space left on device\00Out of memory\00Resource busy\00Interrupted system call\00Resource temporarily unavailable\00Invalid seek\00Cross-device link\00Read-only file system\00Directory not empty\00Connection reset by peer\00Operation timed out\00Connection refused\00Host is down\00Host is unreachable\00Address in use\00Broken pipe\00I/O error\00No such device or address\00Block device required\00No such device\00Not a directory\00Is a directory\00Text file busy\00Exec format error\00Invalid argument\00Argument list too long\00Symbolic link loop\00Filename too long\00Too many open files in system\00No file descriptors available\00Bad file descriptor\00No child process\00Bad address\00File too large\00Too many links\00No locks available\00Resource deadlock would occur\00State not recoverable\00Previous owner died\00Operation canceled\00Function not implemented\00No message of desired type\00Identifier removed\00Device not a stream\00No data available\00Device timeout\00Out of streams resources\00Link has been severed\00Protocol error\00Bad message\00File descriptor in bad state\00Not a socket\00Destination address required\00Message too large\00Protocol wrong type for socket\00Protocol not available\00Protocol not supported\00Socket type not supported\00Not supported\00Protocol family not supported\00Address family not supported by protocol\00Address not available\00Network is down\00Network unreachable\00Connection reset by network\00Connection aborted\00No buffer space available\00Socket is connected\00Socket not connected\00Cannot send after socket shutdown\00Operation already in progress\00Operation in progress\00Stale file handle\00Remote I/O error\00Quota exceeded\00No medium found\00Wrong medium type\00Multihop attempted\00Required key not available\00Key has expired\00Key has been revoked\00Key was rejected by service\00\00\00\00\00\00\00\00\00\a5\02[\00\f0\01\b5\05\8c\05%\01\83\06\1d\03\94\04\ff\00\c7\031\03\0b\06\bc\01\8f\01\7f\03\ca\04+\00\da\06\af\00B\03N\03\dc\01\0e\04\15\00\a1\06\0d\01\94\02\0b\028\06d\02\bc\02\ff\02]\03\e7\04\0b\07\cf\02\cb\05\ef\05\db\05\e1\02\1e\06E\02\85\00\82\02l\03o\04\f1\00\f3\03\18\05\d9\00\da\03L\06T\02{\01\9d\03\bd\04\00\00Q\00\15\02\bb\00\b3\03m\00\ff\01\85\04/\05\f9\048\00e\01F\01\9f\00\b7\06\a8\01s\02S\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00!\04\00\00\00\00\00\00\00\00/\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\005\04G\04V\04\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\a0\04\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00F\05`\05n\05a\06\00\00\cf\01\00\00\00\00\00\00\00\00\c9\06\e9\06\f9\06\1e\079\07I\07^\07")
  (data (;1;) (i32.const 67764) "\d0\0a\01\00"))
